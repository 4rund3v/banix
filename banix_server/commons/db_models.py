from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    _id = Column(Integer, primary_key=True, autoincrement=True)
    display_name = Column(String)
    username =  Column(String)
    email_id = Column(String)
    password = Column(String)
    user_role = Column(String)
    public_id = Column(String)

    def __repr__(self):
        return "<User(name={})>".format(self.username)

    def as_dict(self):
        return dict( _id=str(self._id),
                    display_name=str(self.display_name),
                    username=str(self.username),
                    email_id=str(self.email_id),
                    password=str(self.password),
                    user_role=str(self.user_role),
                    public_id=str(self.public_id),
                    )


class UserAddress(Base):
    __tablename__ = "useraddress"
    id = Column(Integer, primary_key=True, autoincrement=True)
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
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_datetime = Column(String)
    total_datetime = Column(String)
    ship_to = Column(String)
    order_id = Column(String)
    invoice_id = Column(String)
    status = Column(String)


class Product(Base):
    __tablename__ = "products"
    _id = Column(String, primary_key=True)
    name = Column(String)
    image = Column(String)
    description = Column(String)
    brand = Column(String)
    category = Column(String)
    rating = Column(Float)
    total_reviews = Column(Integer)
    price = Column(Integer)
    stock = Column(Integer)

    def __repr__(self):
        return "<Product(name={})>".format(self.name)

    def as_dict(self):
        return dict(_id= str(self._id),
                    name=self.name,
                    image=self.image,
                    descirption=self.description,
                    brand=self.brand,
                    category=self.category,
                    rating=self.rating,
                    total_reviews=self.total_reviews,
                    price=self.price,
                    stock=self.stock
                    )





