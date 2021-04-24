from src.models import Base
from sqlalchemy import ForeignKey, Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.models import Customer
from datetime import datetime


class Product(Base):

    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, autoincrement=True,)
    name = Column(String)
    brand = Column(String)
    category = Column(String)
    rating = Column(Float)
    total_reviews = Column(Integer)
    selling_price = Column(Integer)
    cost_price = Column(Integer)
    stock = Column(Integer)
    product_media = relationship("ProductMedia", back_populates="products", uselist=False, cascade="all, delete, delete-orphan")
    product_variant = relationship("ProductVariant", back_populates="products", cascade="all, delete, delete-orphan")
    product_specification = relationship("ProductSpecification", uselist=False, back_populates="products", cascade="all, delete, delete-orphan")
    product_attributes = relationship("ProductAttributes", back_populates="products", cascade="all, delete, delete-orphan")
    alternate_purchase_options = relationship("AlternatePurchaseOption", back_populates="products", cascade="all, delete, delete-orphan" )
    product_created_datetime = Column(DateTime(timezone=True), default=datetime.now)
    product_updated_datetime = Column(DateTime(timezone=True),default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return "<Product(name={})>".format(self.name)

    def to_dict(self):
        """
           To return the product as a dictionary representation
        """

        product_specification = {}
        if self.product_specification:
            product_specification = self.product_specification.to_dict()

        product_variant= []
        if self.product_variant:
            for variant in self.product_variant:
                product_variant.append(variant.to_dict())

        product_media = {}
        if self.product_media:
            product_media = self.product_media.to_dict()

        alternate_purchase_options = []
        if self.alternate_purchase_options:
            alternate_purchase_options = [ alt_option.to_dict() for alt_option in self.alternate_purchase_options ]

        product_attributes = []
        if self.product_attributes:
            product_attributes = [ prod_attrib.to_dict() for prod_attrib in self.product_attributes ]
        print(f"product_created_datetime :: {self.product_created_datetime} {type(self.product_created_datetime)}")
        return dict(product_id=str(self.product_id),
                    name=self.name,
                    brand=self.brand,
                    category=self.category,
                    rating=self.rating,
                    total_reviews=self.total_reviews,
                    cost_price=self.cost_price,
                    selling_price=self.selling_price,
                    stock=self.stock,
                    product_media=product_media,
                    product_specification=product_specification,
                    product_variant=product_variant,
                    alternate_purchase_options = alternate_purchase_options,
                    product_created_datetime=self.product_created_datetime,     
                    product_updated_datetime=self.product_updated_datetime,
                    )


class ProductVariant(Base):

    __tablename__ = "product_variant"

    product_variant_id = Column(Integer, primary_key=True, autoincrement=True, )
    name = Column(String)
    description = Column(String)
    product_variant_selling_price = Column(Integer)
    product_variant_cost_price = Column(Integer)
    product_variant_stock = Column(Integer)
    product_foreign_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    products = relationship("Product", back_populates="product_variant")
    product_media = relationship("ProductMedia", back_populates="product_variant",
                                          cascade="all, delete, delete-orphan")
    product_specification = relationship("ProductSpecification",uselist=False, back_populates="product_variant",
                                                   cascade="all, delete, delete-orphan")


class ProductMedia(Base):

    __tablename__ = "product_media"

    product_media_id = Column(Integer, primary_key=True, autoincrement=True)
    primary_image_id = Column(String(300))
    primary_video_id = Column(String(300))

    product_foreign_id = Column(Integer, ForeignKey("products.product_id"), nullable=True)
    products = relationship("Product", back_populates="product_media")
    product_variant_id_foreign_id = Column(Integer, ForeignKey("product_variant.product_variant_id"), nullable=True)
    product_variant = relationship("ProductVariant", back_populates="product_media")

    product_carousel_media = relationship("ProductCarouselMedia", back_populates="product_media", cascade="all, delete, delete-orphan")
    product_demonstration_media = relationship("ProductDemonstrationMedia", back_populates="product_media", cascade="all, delete, delete-orphan")

    def to_dict(self):
        product_carousel_media = []
        if self.product_carousel_media:
            product_carousel_media = []
        product_demonstration_media = []
        if self.product_demonstration_media:
            product_demonstration_media = []
        return dict(product_media_id=self.product_media_id,
                    primary_image_id=self.primary_image_id,
                    primary_video_id=self.primary_video_id,
                    product_carousel_media=product_carousel_media,
                    product_demonstration_media=product_demonstration_media
                    )


class ProductCarouselMedia(Base):
    __tablename__ = "product_carousel_media"

    carousel_media_id = Column(Integer, primary_key=True, autoincrement=True)
    media_id = Column(String(300))
    poster_id = Column(String(300))
    media_position = Column(Integer, default=0)
    media_type = Column(String(30))
    product_media_foreign_id = Column(Integer, ForeignKey("product_media.product_media_id"), nullable=False)
    product_media = relationship("ProductMedia", back_populates="product_carousel_media")

    def to_dict(self):
        return dict(carousel_media_id=self.carousel_media_id,
                    poster_id=self.poster_id,
                    media_id=self.media_id,
                    media_position=self.media_position,
                    media_type=self.media_type)


class ProductDemonstrationMedia(Base):
    __tablename__ = "product_demonstration_media"

    demonstration_media_id = Column(Integer, primary_key=True, autoincrement=True)
    media_id = Column(String(300))
    media_type = Column(String(30))

    product_media_foreign_id = Column(Integer, ForeignKey("product_media.product_media_id"), nullable=False)
    product_media = relationship("ProductMedia", back_populates="product_demonstration_media")


class ProductSpecification(Base):

    __tablename__ = "product_specification"

    product_specification_id = Column(Integer, primary_key=True, autoincrement=True)
    product_description = Column(String(1000))
    product_dimensions = relationship("ProductDimensions",uselist=False, back_populates="product_specification",
                                                   cascade="all, delete, delete-orphan")
    product_box_dimensions = relationship("ProductBoxDimensions",uselist=False, back_populates="product_specification",
                                          cascade="all, delete, delete-orphan")
    product_box_contents = Column(String(500))

    product_foreign_id = Column(Integer, ForeignKey("products.product_id"), nullable=True)
    products = relationship("Product", back_populates="product_specification")

    product_variant_foreign_id = Column(Integer, ForeignKey("product_variant.product_variant_id"), nullable=True)
    product_variant = relationship("ProductVariant", back_populates="product_specification")
    
    def to_dict(self):
        if self.product_dimensions:
            product_dimensions = self.product_dimensions.to_dict()
        else:
            product_dimensions = {}
        if self.product_box_dimensions:
            product_box_dimensions = self.product_box_dimensions.to_dict()
        else:
            product_box_dimensions = {}
        product_box_contents = []
        if self.product_box_contents:
            product_box_contents = self.product_box_contents.split(",")
        return dict(product_specification_id= self.product_specification_id,
            product_description=self.product_description,
            product_dimensions=product_dimensions,
            product_box_contents=product_box_contents,
            product_box_dimensions=product_box_dimensions,
            )


class ProductDimensions(Base):

    __tablename__ = "product_dimensions"

    product_dimensions_id = Column(Integer, primary_key=True, autoincrement=True, )
    # in mm
    width = Column(Integer)
    height = Column(Integer)
    depth = Column(Integer)
    # in grams
    weight = Column(Integer)
    length = Column(Integer)
    product_specification_foreign_id = Column(Integer, ForeignKey("product_specification.product_specification_id"), nullable=False)
    product_specification = relationship("ProductSpecification", uselist=False, back_populates="product_dimensions")

    def to_dict(self):
        return dict(width=self.width,
                    height=self.height,
                    depth=self.depth,
                    weight=self.weight)


class ProductBoxDimensions(Base):
    __tablename__ = "product_box_dimensions"
    product_box_dimensions_id = Column(Integer, primary_key=True, autoincrement=True, )
    # in mm
    width = Column(Integer)
    height = Column(Integer)
    depth = Column(Integer)
    # in grams
    weight = Column(Integer)
    length = Column(Integer)
    product_specification_foreign_id = Column(Integer, ForeignKey("product_specification.product_specification_id"),
                                              nullable=False)
    product_specification = relationship("ProductSpecification",uselist=False, back_populates="product_box_dimensions")

    def to_dict(self):
        return dict(width=self.width,
                    height=self.height,
                    depth=self.depth,
                    weight=self.weight,
                    length=self.length)


class ProductReviews(Base):
    __tablename__ = "product_reviews"
    review_id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.product_id"), nullable=False)
    user_id = Column(Integer,  ForeignKey("customers.customer_id"))
    review_date = Column(DateTime)
    rating = Column(Integer)
    comment = Column(String(1000))

    def to_dict(self):
        return dict(review_id=self.review_id,
                    product_id=self.product_id,
                    user_id=self.user_id,
                    review_date=self.review_date,
                    rating=self.rating,
                    comment=self.comment)


class AlternatePurchaseOption(Base):

    __tablename__ = "alternate_purchase_options"

    alt_opt_id = Column(Integer, primary_key=True, autoincrement=True)
    product_foreign_id = Column(Integer, ForeignKey("products.product_id"), nullable=True)
    products = relationship("Product", back_populates="alternate_purchase_options")
    alternate_site = Column(String(30))
    alternate_site_icon = Column(String(30))
    alternate_product_url = Column(String(300))

    def to_dict(self):
        return dict(alternate_site=self.alternate_site, alternate_product_url=self.alternate_product_url)


class Attributes(Base):

    __tablename__ = "attributes"
    attribute_id = Column(Integer, primary_key=True, autoincrement=True)
    attribute_name = Column(String(50), nullable=False, unique=True)
    product_attribute_foreign_id = Column(Integer, ForeignKey("product_attributes.product_attribute_id"), nullable=True)
    product_attributes = relationship("ProductAttributes", back_populates="attributes")

    def to_dict(self):
        return dict(attribute_id=self.attribute_id, attribute_name=self.attribute_name)


class ProductAttributes(Base):

    __tablename__ = 'product_attributes'

    product_attribute_id = Column(Integer, primary_key=True, autoincrement=True)
    product_foreign_id = Column(Integer, ForeignKey("products.product_id"), nullable=True)
    products = relationship("Product", back_populates="product_attributes")
    attributes = relationship("Attributes", back_populates="product_attributes", uselist=False)

    attribute_value = Column(String(200))
    attribute_featured = Column(Boolean, default=False)

