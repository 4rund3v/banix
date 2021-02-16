from src.models import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class PaymentType(Base):
    __tablename__ = "payment_type"

    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    method_name = Column(String(100), nullable=False, unique=True)
    orders = relationship("Orders", back_populates="payment_type")
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False, unique=True)

    def __repr__(self):
        return f"""<PaymentType method_name: {self.method_name}>"""

    def to_dict(self):
        return dict(payment_id=self.payment_id,
                    method_name=self.method_name)
