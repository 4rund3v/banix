from src.models import Base

from sqlalchemy import ForeignKey, Column, Integer, String
from sqlalchemy.orm import relationship

class Role(Base):

    __tablename__ = "role"

    role_id = Column(Integer, primary_key=True, autoincrement=True)
    role_name = Column(String(20), nullable=False, unique=False)

    admin_foreign_id = Column(Integer, ForeignKey("admin.admin_id"), nullable=True, unique=True)
    admin = relationship("Admin", back_populates="role")

    customer_foreign_id = Column(Integer, ForeignKey("customers.customer_id"), nullable=True, unique=True)
    customers = relationship("Customer", back_populates="role")

    vendor_foreign_id = Column(Integer, ForeignKey("vendors.vendor_id"), nullable=True, unique=True)
    vendors = relationship("Vendor", back_populates="role")

    def __repr__(self):
        return f"""<Role role_id{self.role_id} role name{self.role_name}>"""

    def to_dict(self):
        return dict(role_id=self.role_id, role_name=self.role_name)
