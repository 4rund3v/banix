
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    password = Column(String)

    def __repr__(self):
        return "<User(name={})>".format(self.name)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    image = Column(String)
    description = Column(String)
    brand = Column(String)
    category = Column(String)
    rating = Column(Float)
    total_reviews = Column(Integer)
    price = Column(Integer)
    stock = Column(Integer)
    offer = Column(Float) 
    
    def __repr__(self):
        return "<Product(name={})>".format(self.name)

