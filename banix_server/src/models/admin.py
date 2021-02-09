from src.models import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Admin(Base):

    __tablename__ = "admin"

    admin_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30))
    email_id = Column(String(50))
    password = Column(String(200))
    role = relationship("Role", back_populates="admin", cascade="all, delete, delete-orphan")

    def __repr__(self):
        return f"""<Admin(name={self.name}) email_id={self.email_id}>"""

    def to_dict(self):
        return dict(admin_id=self.admin_id,
                    name=self.name,
                    email_id=self.email_id,
                    role_details=self.role.role_name)
