from src.models import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Vendor(Base):

    __tablename__ = "vendors"

    vendor_id = Column(Integer, primary_key=True, autoincrement=True)
    vendor_name = Column(String)
    email_id = Column(String)
    primary_mobile_number = Column(Integer)
    role_details = relationship("Role", back_populates="vendors", cascade="all, delete, delete-orphan")
    product_details = relationship("Product", back_populates="vendors", cascade="all, delete, delete-orphan")

    def __repr__(self):
        return "<Vendor(vendor_name={})>".format(self.vendor_name)

    def as_dict(self):
        products = [x.to_dict() for x in self.product_details]
        return dict(vendor_id=str(self.customer_id),
                    vendor_name=str(self.display_name),
                    username=str(self.username),
                    email_id=str(self.email_id),
                    primary_mobile_number=self.primary_mobile_number,
                    role_details=self.role_details.role_name,
                    products=products,
                    )
