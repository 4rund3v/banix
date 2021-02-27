from src.models import Base
from sqlalchemy import ForeignKey,Column, Integer, String, Float
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
    product_media = relationship("ProductMedia", back_populates="products",uselist=False,cascade="all, delete, delete-orphan")
    product_variant = relationship("ProductVariant", back_populates="products", cascade="all, delete, delete-orphan")
    product_specification = relationship("ProductSpecification", uselist=False, back_populates="products", cascade="all, delete, delete-orphan")

    def __repr__(self):
        return "<Product(name={})>".format(self.name)

    def to_dict(self):
        product_specification = {}
        if self.product_specification:
            product_specification = self.product_specification.to_dict()

        product_variant= []
        if self.product_variant:
            for variant in self.product_variant:
                product_variant.append(variant.to_dict())

        product_media = {}
        if self.product_media:
            product_media = self.product_media.to_dict

        return dict(product_id=str(self.product_id),
                    name=self.name,
                    brand=self.brand,
                    category=self.category,
                    rating=self.rating,
                    total_reviews=self.total_reviews,
                    cost_price=self.cost_price,
                    selling_price=self.selling_price,
                    stock=self.stock,
                    product_specification=product_specification,
                    product_variant=product_variant,
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
    media_type = Column(String(30))
    product_media_foreign_id = Column(Integer, ForeignKey("product_media.product_media_id"), nullable=False)
    product_media = relationship("ProductMedia", back_populates="product_carousel_media")

    def to_dict(self):
        return dict(carousel_media_id=self.carousel_media_id,poster_id=self.poster_id,media_id=self.media_id, media_type=self.media_type)

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
        print("[ProductSpecification][to_dict] is called ")
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
        print("[ProductDimensions][to_dict] is called ")
        
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
        print("[ProductBoxDimensions][to_dict] is called ")
        return dict(width=self.width,
                    height=self.height,
                    depth=self.depth,
                    weight=self.weight,
                    length=self.length)