import os
import sys
import smtplib
from email.mime.text import MIMEText
import bottle
from bottle import run, route, error
import json

from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from email_template import generate_email_template
from email_config import SENDER_EMAIL_ID, SENDER_EMAIL_PASSWORD

class EmailClient:

    def __init__(self, smtp_server="smtp.gmail.com", smtp_port=587,\
                    senders_email=None, senders_password=None, raise_exception=False):
        self.smtp_host = smtp_server
        self.smtp_port = smtp_port
        self.email_id = senders_email
        self.password = senders_password
        self.logged_in = False
        self.raise_exception = False
        self.server = None


    def connect(self):
        try:
            self.server = smtplib.SMTP(self.smtp_host, self.smtp_port,None,30)
            self.server.starttls()
            return True
        except Exception as ex:
            print("EmailClient.connect: Exception(: %s) while connecting to smtp server." %str(ex))
            if self.raise_exception:
                raise Exception(ex)
        return False


    def close(self):
        try:
            self.server.close()
            return True
        except Exception as ex:
            print("EmailClient.close: Exception(: %s) while closing smtp server connection." %str(ex))
            if self.raise_exception:
                raise Exception(ex)
        return False


    def login(self, senders_email=None, senders_password=None):
        try:
            if not self.connect():
                return False

            email = senders_email if senders_email else self.email_id
            password = senders_password if senders_password else self.password

            self.server.login(email, password)
            self.logged_in = True
            return True
        except Exception as ex:
            print("EmailClient.login: Exception(: %s) in login" %str(ex))
            if self.raise_exception:
                raise Exception(ex)
        return False


    def logout(self):
        try:
            if self.logged_in:
                self.server.quit()
                self.close()
            return True
        except Exception as ex:
            print("EmailClient.logout: Exception(: %s) in logout" %str(ex))
            if self.raise_exception:
                raise Exception(ex)
        self.logged_in = False
        return False


    def sendEmail(self, recipients, subject, body, files =[], logout=True):
        status = "failed"
        try:
            assert type(files)==list
 
            if self.email_id and self.password:
                self.login()

            else:
                raise Exception("Login failed; senders email and password not provided.")

            recipients_str = ""
            if isinstance(recipients, list):
                recipients_str = ", ".join(recipients)

            elif type(recipients) in [str, unicode]:
                recipients_str = recipients
                recipients = [recipients]

            #mail = MIMEText(body)
            mail = MIMEMultipart()
            mail["Subject"] = subject
            mail["From"] = self.email_id
            mail["To"] = recipients_str
            mail.attach(MIMEText(body,'html'))
            self.add_attachments_to_mail(mail,files)
            self.server.sendmail(self.email_id, recipients, mail.as_string())
            status = "success"
        except Exception as ex:
            print("EmailClient.sendEmail: Failed sending email due to Exception(: %s)" %str(ex))
            if self.raise_exception:
                raise Exception(ex)
        self.logout()
        return status
    
    def add_attachments_to_mail(self,mail,file_path=[]):
        for _file in file_path:
            if not os.path.isfile(_file):
                continue
            ctype, encoding = mimetypes.guess_type(_file)
            if ctype is None or encoding is not None: 
                ctype = 'application/octet-stream'
            maintype, subtype = ctype.split('/', 1)
            if maintype == 'text':
                fp = open(_file)
                # Note: we should handle calculating the charset
                msg = MIMEText(fp.read(), _subtype=subtype)
                fp.close()
            elif maintype == 'image':
                fp = open(_file, 'rb')
                msg = MIMEImage(fp.read(), _subtype=subtype)
                fp.close()
            elif maintype == 'audio':
                fp = open(_file, 'rb')
                msg = MIMEAudio(fp.read(), _subtype=subtype)
                fp.close()
            else:
                fp = open(_file, 'rb')
                msg = MIMEBase(maintype, subtype)
                msg.set_payload(fp.read())
                fp.close()
                # Encode the payload using Base64
                encoders.encode_base64(msg)
            filename = os.path.basename(_file)
            msg.add_header('Content-Disposition', 'attachment', filename=filename)
            mail.attach(msg)
        return mail
 

@route("/send_email", method="POST")
def send_email():
    #Input: {"username":"Arun", "email_id": "4rund3v@gmail.com"}
    info = json.load(bottle.request.body)
    print("[send_email] Info: {}".format(info))
    mail_man = EmailClient(senders_email = SENDER_EMAIL_ID, senders_password = SENDER_EMAIL_PASSWORD, raise_exception=True)
    mail_body = generate_email_template(info["username"])
    try:
        mail_status = mail_man.sendEmail([info["email_id"]], "your order placed", mail_body, logout=True)
        print("[send_email] mail status: {}".format(mail_status))
    except Exception as ex:
        print("[send_email] Exception is {}".format(ex))


if __name__ == '__main__':
    run(host='0.0.0.0', port=7702, server='twisted')