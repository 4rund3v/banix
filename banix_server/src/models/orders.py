from src.models import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Orders(Base):

    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    order_quantity = Column(Integer, nullable=False)

    order_product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    order_customer_id = Column(Integer, ForeignKey("customers.customer_id"), nullable=False)
    order_payment_type_id = Column(Integer, ForeignKey("payment_type.payment_id"), nullable=False)
    order_date = Column(String(30), nullable=False)
    order_price = Column(Integer, nullable=False)
    order_selling_price = Column(Integer, nullable=False)
    order_shipping_price = Column(Integer, nullable=False)


    def __repr__(self):
        return f"""<Orders order_id{self.order_id} order_quantity{self.order_quantity}>"""

    def to_dict(self):
        return dict(order_id=self.order_id, order_quantity=self.order_quantity)
