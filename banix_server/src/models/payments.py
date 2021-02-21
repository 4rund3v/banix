from src.models import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class PaymentInfo(Base):
    __tablename__ = "payment_info"

    payment_id = Column(Integer, primary_key=True, autoincrement=True)
    payment_transaction_id = Column(Integer, nullable=False, unique=True)
    payment_gateway = Column(String(100), nullable=False)
    payment_method = Column(String(100), nullable=False)
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False, unique=True)
    orders = relationship("Orders", back_populates="payment_info")


    def __repr__(self):
        return f"""<PaymentInfo payment_method: {self.payment_method}>"""

    def to_dict(self):
        return dict(payment_id=self.payment_id,
                    payment_transaction_id=self.payment_transaction_id,
                    payment_gateway=self.payment_gateway,
                    payment_method=self.payment_method)
