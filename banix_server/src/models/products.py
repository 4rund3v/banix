from src.models import Base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship

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
    product_media = relationship("ProductMedia", back_populates="products", cascade="all, delete, delete-orphan")
    product_variants = relationship("ProductVariant", back_populates="products", cascade="all, delete, delete-orphan")
    product_specifications = relationship("ProductSpecification", back_populates="products", cascade="all, delete, delete-orphan")

    def __repr__(self):
        return "<Product(name={})>".format(self.name)

    def as_dict(self):
        return dict(product_id=str(self.product_id),
                    name=self.name,
                    description=self.description,
                    brand=self.brand,
                    category=self.category,
                    rating=self.rating,
                    total_reviews=self.total_reviews,
                    cost_price=self.cost_price,
                    selling_price=self.selling_price,
                    stock=self.stock
                    )



class ProductMedia(Base):

    __tablename__ = "product_media"
    product_media_id = Column(Integer, primary_key=True, autoincrement=True)
    primary_image_id = Column(String(300))
    primary_video_id = Column(String(300))
    carousel_medias = relationship("CarouselMedia", back_populates="product_media", cascade="all, delete, delete-orphan")
    demonstration_medias = relationship("DemonstrationMedia", back_populates="product_media", cascade="all, delete, delete-orphan")


class ProductCarouselMedia(Base):
    __tablename__ = "product_carousel_media"

    carousel_media_id = Column(Integer, primary_key=True, autoincrement=True)
    media_id = Column(String(300))
    media_type = Column(String(30))


class ProductDemonstrationMedia(Base):
    __tablename__ = "product_demonstration_media"

    demonstration_media_id = Column(Integer, primary_key=True, autoincrement=True)
    media_id = Column(String(300))
    media_type = Column(String(30))


class ProductVariant(Base):

    __tablename__ = "product_variant"

    product_variant_id = Column(Integer, primary_key=True, autoincrement=True, )
    name = Column(String)
    description = Column(String)
    product_variant_selling_price = Column(Integer)
    product_variant_cost_price = Column(Integer)
    product_variant_stock = Column(Integer)
    product_variant_media = relationship("ProductMedia", back_populates="product_variant",
                                          cascade="all, delete, delete-orphan")
    product_variant_specifications = relationship("ProductSpecification", back_populates="product_variant",
                                                   cascade="all, delete, delete-orphan")


class ProductSpecification(Base):

    __tablename__ = "product_specification"
    product_specification_id = Column(Integer, primary_key=True, autoincrement=True)
    product_description = Column(String(1000))
    product_dimensions = relationship("ProductDimensions", back_populates="product_specification",
                                                   cascade="all, delete, delete-orphan")
    product_box_dimensions = relationship("ProductBoxDimensions", back_populates="product_specification",
                                          cascade="all, delete, delete-orphan")
    product_box_contents = Column(String(500))


class ProductDimensions(Base):

    __tablename__ = "product_dimensions"
    product_dimensions_id = Column(Integer, primary_key=True, autoincrement=True, )
    # in mm
    width = Column(Integer)
    height = Column(Integer)
    depth = Column(Integer)
    # in grams
    weight = Column(Integer)


class ProductBoxDimensions(Base):
    __tablename__ = "product_box_dimensions"
    product_box_dimensions_id = Column(Integer, primary_key=True, autoincrement=True, )
    # in mm
    width = Column(Integer)
    height = Column(Integer)
    depth = Column(Integer)
    # in grams
    weight = Column(Integer)