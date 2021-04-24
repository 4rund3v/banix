from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


from src.models.customers import Customer, Address
from src.models.cart import Cart, CartItem
from src.models.orders import Orders, OrderItem, OrderShippingInfo, OrderPrice, OrderStatus
from src.models.payments import PaymentInfo
from src.models.products import Product, ProductMedia, ProductVariant
from src.models.products import ProductDimensions, ProductBoxDimensions, ProductSpecification
from src.models.products import ProductReviews, ProductCarouselMedia, ProductDemonstrationMedia
from src.models.products import AlternatePurchaseOption, Attributes, ProductAttributes
from src.models.vendors import Vendor
from src.models.categories import Category