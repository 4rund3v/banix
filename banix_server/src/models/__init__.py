from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()


from src.models.admin import Admin
from src.models.customers import Customer, Address
from src.models.orders import Orders, OrderItem, OrderShippingInfo
from src.models.payments import PaymentType
from src.models.products import Product, ProductMedia, ProductVariant, ProductDimensions, ProductBoxDimensions, ProductSpecification, ProductCarouselMedia, ProductDemonstrationMedia
from src.models.role import Role
from src.models.vendors import Vendor
