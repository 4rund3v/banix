from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    display_name = Column(String)
    username =  Column(String)
    email_id = Column(String)
    password = Column(String)


class UserAddress(Base):
    __tablename__ = "useraddress"
    full_name = Column(String)
    mobile_number = Column(String)
    pincode = Column(Integer)
    primary_info = Column(String)
    secondary_info = Column(String)
    landmark = Column(String)
    town = Column(String)
    state = Column(String)

class UserOrders(Base):
    __tablename__ = "userorders"
    created_datetime = Column(String)
    total_datetime = Column(String)
    ship_to = Column(String)
    order_id = Column(String)
    invoice_id = Column(String)
    status = Column(String)