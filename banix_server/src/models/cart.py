from src.models import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Cart(Base):

    __tablename__ = "cart"

    cart_id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey('customers.customer_id'))
    cart_items = relationship("CartItem", backref="cart_item")

    def __repr__(self):
        return f"""<Cart(cart_id={self.cart_id}) email_id={self.email_id}>"""

    def to_dict(self):
        cart_items = []
        if self.cart_items:
            cart_items = [cart_item.to_dict() for cart_item in self.cart_items]
        return dict(cart_id=self.cart_id,
                    customer_id=self.customer_id,
                    cart_items = cart_items
                    )


class CartItem(Base):
    __tablename__ = "cart_items"

    cart_item_id = Column(Integer, primary_key=True, autoincrement=True)
    cart_id = Column(Integer, ForeignKey('cart.cart_id'))
    cart_item_qty =  Column(Integer,  nullable=False)
    product_id =  Column(Integer, ForeignKey('products.product_id'))

    def __repr__(self):
        return f"""<CartItem(cart_item_id={self.cart_item_id}) cart_item_qty={self.cart_item_qty} product_id={self.product_id}>"""

    def to_dict(self):
        return dict(cart_item_id=self.cart_item_id,
                    cart_item_qty=self.cart_item_qty,
                    product_id = self.product_id
                    )