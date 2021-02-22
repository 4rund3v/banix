from src.models import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Customer(Base):

    __tablename__ = "customers"

    customer_id = Column(Integer, primary_key=True, autoincrement=True)
    display_name = Column(String)
    username = Column(String)
    email_id = Column(String)
    password = Column(String)
    role = relationship("Role", back_populates="customers", uselist=False, cascade="all, delete, delete-orphan")
    # cart_details = relationship("Cart", back_populates="customers", cascade="all, delete, delete-orphan")
    public_id = Column(String)
    primary_mobile_number = Column(Integer)

    def __repr__(self):
        return "<Customer(name={})>".format(self.username)

    def to_dict(self):
        return dict(customer_id=str(self.customer_id),
                    display_name=str(self.display_name),
                    username=str(self.username),
                    email_id=str(self.email_id),
                    public_id=str(self.public_id),
                    primary_mobile_number=self.primary_mobile_number,
                    role=self.role.role_name,
                    )


class Address(Base):
    __tablename__ = "address"
    address_id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(30), nullable=False)
    mobile_number = Column(String(15), nullable=False)
    pincode = Column(Integer, nullable=False)
    building_info = Column(String(100), nullable=False)
    street_info = Column(String(100))
    landmark_info = Column(String(200))
    city_info = Column(String(200), nullable=False)
    state_info = Column(String(200), nullable=False)
    address_type = Column(String(20))
    customer_id = Column(Integer, ForeignKey("customers.customer_id"))
    order_id = Column(Integer, ForeignKey("orders.order_id"))
    
    def __repr__(self):
        return f"""<Address ({self.full_name},({self.mobile_number} pincode:[{self.pincode}]))>"""

    def to_dict(self):
        return dict(address_id=self.address_id,
                    full_name=self.full_name,
                    mobile_number=self.mobile_number,
                    pincode=self.pincode,
                    building_info=self.building_info,
                    street_info=self.street_info,
                    landmark_info=self.landmark_info,
                    city_info=self.city_info,
                    state_info=self.state_info,
                    address_type=self.address_type)
