import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from configuration import DATABASE_FILE
from commons.db_models import Base, User, UserAddress, UserOrders, Product

if not os.path.exists(os.path.dirname(DATABASE_FILE)):
    print(f"[utils] Creating the database dir : {os.path.dirname(DATABASE_FILE)}")
    os.makedirs(os.path.dirname(DATABASE_FILE))

engine = create_engine('sqlite:///{}'.format(DATABASE_FILE), echo=True)
Session = sessionmaker(bind=engine)
session = Session()
