from src.models import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

class Orders(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, autoincrement=True)
    order_customer_id = Column(Integer, ForeignKey("customers.customer_id"), nullable=False)
    order_info_id =  Column(String(100), unique=True, nullable=False)
    order_date = Column(String(30), nullable=False)
    order_created_datetime = Column(DateTime(), default=datetime.now)
    order_updated_datetime = Column(DateTime(), default=datetime.now, onupdate=datetime.now)
    order_price = relationship("OrderPrice", uselist=False, cascade="all, delete, delete-orphan")
    order_status = relationship("OrderStatus", uselist=False, cascade="all, delete, delete-orphan")
    payment_info = relationship("PaymentInfo", uselist=False, back_populates="orders")
    order_items = relationship("OrderItem", cascade="all, delete, delete-orphan")
    order_shipping_address = relationship("Address", uselist=False,cascade="all, delete, delete-orphan")
    order_shipping_info = relationship("OrderShippingInfo", uselist=False, cascade="all, delete, delete-orphan")

    def __repr__(self):
        return f"""<Orders order_id{self.order_id} order_date{self.order_date}>"""

    def to_dict(self):
        order_price = {}
        if self.order_price:
            order_price = self.order_price.to_dict()

        order_status = {}
        if self.order_status:
            order_status = self.order_status.to_dict()

        payment_info = {}
        if self.payment_info:
            payment_info = self.payment_info.to_dict()
        
        order_items = []
        if self.order_items:
            for order_item in self.order_items:
                order_items.append(order_item.to_dict())

        order_shipping_address = {}
        if self.order_shipping_address:
            order_shipping_address = self.order_shipping_address.to_dict()

        order_shipping_info = {}
        if self.order_shipping_info:
            order_shipping_info = self.order_shipping_info.to_dict()

        return dict(order_id=self.order_id,
                    order_customer_id=self.order_customer_id,
                    order_info_id=self.order_info_id,
                    payment_info=payment_info,
                    order_items=order_items,
                    order_date=self.order_date,
                    order_price=order_price,
                    order_shipping_address=order_shipping_address,
                    order_shipping_info=order_shipping_info,
                    order_status=order_status,
                    order_created_datetime=str(self.order_created_datetime),
                    order_updated_datetime=str(self.order_updated_datetime),
                    )


class OrderPrice(Base):

    __tablename__ = "order_price"
    order_price_id = Column(Integer, primary_key=True, autoincrement=True)
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    orders = relationship("Orders", back_populates="order_price")
    order_total_price = Column(Integer, nullable=False)
    order_shipping_price = Column(Integer, nullable=False)
    order_tax_price = Column(Integer, nullable=False)
    order_selling_price = Column(Integer, nullable=False)

    def to_dict(self):
        return dict(
            order_price_id=self.order_price_id,
            order_foreign_id=self.order_foreign_id,
            order_total_price=self.order_total_price,
            order_shipping_price=self.order_shipping_price,
            order_tax_price=self.order_tax_price,
            order_selling_price=self.order_selling_price,
            )


class OrderStatus(Base):

    __tablename__ = "order_status"

    order_status_id = Column(Integer, primary_key=True, autoincrement=True)
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    orders = relationship("Orders", back_populates="order_status")
    status = Column(String(30), nullable=False)

    def to_dict(self):
        return dict(order_status_id=self.order_status_id,
            status=self.status)



class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id = Column(Integer, primary_key=True, autoincrement=True)
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    orders = relationship("Orders", back_populates="order_items")
    order_product_foreign_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    order_item_total_price = Column(Integer, nullable=False)
    order_item_selling_price = Column(Integer, nullable=False)
    order_item_shipping_price = Column(Integer, nullable=False)
    order_item_tax_price = Column(Integer, nullable=False)
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
                order_item_tax_price=self.order_item_tax_price,
                order_item_quantity=self.order_item_quantity)

class OrderShippingInfo(Base):

    __tablename__ = "order_shipping_info"
    order_item_shipping_info_id = Column(Integer, primary_key=True, autoincrement=True)
    order_shipping_status = Column(String, nullable=False)
    order_foreign_id = Column(Integer, ForeignKey("orders.order_id"), nullable=False)
    shipping_info_created_datetime = Column(DateTime(), default=datetime.now)
    shipping_info_updated_datetime = Column(DateTime(), default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"""<OrderShippingInfo order_item_shipping_info_id{self.order_item_shipping_info_id} order foreign key {self.order_foreign_id}>"""

    def to_dict(self):
        return dict(
                order_item_shipping_info_id=self.order_item_shipping_info_id,
                order_shipping_status=self.order_shipping_status,
                order_foreign_id=self.order_foreign_id, 
                shipping_info_created_datetime=str(self.shipping_info_created_datetime),
                shipping_info_updated_datetime=str(self.shipping_info_updated_datetime)
                )


