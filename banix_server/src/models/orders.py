from src.models import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Orders(Base):

    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    order_customer_id = Column(Integer, ForeignKey("customers.customer_id"), nullable=False)
    order_payment_type_id = Column(Integer, ForeignKey("payment_type.payment_id"), nullable=False)
    order_items = relationship("OrderItem", cascade="all, delete, delete-orphan")
    order_date = Column(String(30), nullable=False)
    order_price = Column(Integer, nullable=False)
    order_shipping_info = relationship("OrderShippingInfo", uselist=False, cascade="all, delete, delete-orphan")

    def __repr__(self):
        return f"""<Orders order_id{self.order_id} order_price{self.order_price}>"""

    def to_dict(self):
        return dict(order_id=self.order_id, order_price=self.order_price)


class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id = Column(Integer, primary_key=True, autoincrement=True)
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    orders = relationship("Orders", back_populates="order_items")
    order_product_foreign_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    order_item_total_price = Column(Integer, nullable=False)
    order_item_selling_price = Column(Integer, nullable=False)
    order_item_shipping_price = Column(Integer, nullable=False)
    order_item_quantity = Column(Integer, nullable=False)

    def __repr__(self):
        return f"""<OrderItem order_item_id{self.order_item_id} order foreign key {self.order_foreign_id}>"""

    def to_dict(self):
        return dict(order_item_id=self.order_item_id,
                order_foreign_id=self.order_foreign_id,
                order_product_foreign_id=self.order_product_foreign_id,
                order_item_total_price=self.order_item_total_price,
                order_item_selling_price=self.order_item_selling_price,
                order_item_shipping_price=self.order_item_shipping_price,
                order_item_quantity=self.order_item_quantity)

class OrderShippingInfo(Base):

    __tablename__ = "order_shipping_info"
    order_item_shipping_price_id = Column(Integer, primary_key=True, autoincrement=True)
    order_shipping_address = Column(String(1024), nullable=False)
    order_shipping_status = Column(String, nullable=False)
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)

    def __repr__(self):
        return f"""<OrderShippingInfo order_item_id{self.order_item_id} order foreign key {self.order_foreign_id}>"""

    def to_dict(self):
        return dict(order_item_id=self.order_item_id,
                order_foreign_id=self.order_foreign_id,
                order_product_foreign_id=self.order_product_foreign_id,
                order_item_total_price=self.order_item_total_price,
                order_item_selling_price=self.order_item_selling_price,
                order_item_shipping_price=self.order_item_shipping_price,
                order_item_quantity=self.order_item_quantity)
