import os
import sys

'''if os.name == "posix":
    BUILD_PATH = "/opt/banix"
else:
    BUILD_PATH = "C:\\Projects\\banix\\banix_server"

sys.path.append(BUILD_PATH)'''

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from commons.db_models import *
from commons.constants import *

engine = create_engine('sqlite:///{}'.format(DATABASE_FILE), echo=True)
Session = sessionmaker(bind=engine)
#Session.configure(bind=engine)
session = Session()

def add_user():
    user_info = User(name="Pavithra", password="pav@123")
    session.add(user_info)
    session.commit()

def get_user():
    session.query(User).filter(User.name.in_(["Pavithra"])).all()

#add_user()
#get_user()