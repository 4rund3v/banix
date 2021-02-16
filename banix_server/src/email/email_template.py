def generate_email_template(username):
    """
    Prepared HTML Email template 
    returns html_template
    """
    return '''<!DOCTYPE html>
              <html>
                <head>

                  <meta charset="utf-8">
                  <meta http-equiv="x-ua-compatible" content="ie=edge">
                  <title>banix order confirmation</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style type="text/css">
                  /**
                  * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                  */
                  @media screen {
                    @font-face {
                      font-family: 'Source Sans Pro';
                      font-style: normal;
                      font-weight: 400;
                      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular');
                    }

                    @font-face {
                      font-family: 'Source Sans Pro';
                      font-style: normal;
                      font-weight: 700;
                      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold');
                    }
                  }
                  /**
                  * Remove blue links for iOS devices.
                  */
                  a[x-apple-data-detectors] {
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    color: inherit !important;
                    text-decoration: none !important;
                  }

                  /**
                  * Fix centering issues in Android 4.4.
                  */
                  div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                  }

                  body {
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                  }

                  a {
                    color: #1a82e2;
                  }
                  </style>
                </head>

                <body style="background-color: #e9ecef;">
                    <p>Dear '''+username+''',</p>
                    <p>
                      Greetings of the day,<br> 
                      Your banix order is placed successfully. 
                      Our team is working round the clock to deliver your order at the earliest.<br>
                      For any clarification contact team@banix.com
                    </p>
                    <p>Thanks<br>Team banix</p>

                </body>
              </html>
 '''