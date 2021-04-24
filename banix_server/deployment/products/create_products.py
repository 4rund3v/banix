import os
import sys
import json
import datetime
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Product, ProductSpecification, ProductDimensions
from src.models import ProductBoxDimensions, ProductReviews, Attributes, ProductAttributes, ProductMedia
from src.models import AlternatePurchaseOption
from src.models import Category
from src.db_utils import session


def prepare_product_specification(product_info, specification_info):
    product_specification = ProductSpecification(products=product_info)
    product_specification.product_description = specification_info["description"]
    product_specification.product_box_contents = specification_info["product_box_contents"]
    product_dimensions = ProductDimensions(**specification_info["product_dimensions"])
    product_dimensions.product_specification = product_specification
    product_box_dimensions = ProductBoxDimensions(**specification_info["product_box_dimensions"])
    product_box_dimensions.product_specification = product_specification
    return product_specification


def prepare_alternate_purchase_options(product_info, alternate_purchase_options):
    alt_purchase_options = []
    for option in alternate_purchase_options:
        purchase_option =  AlternatePurchaseOption(**option)
        purchase_option.products = product_info
        alt_purchase_options.append(purchase_option)
    return alt_purchase_options

def create_default_products():
    """
     To add the defult products
    """
    products_store = os.path.join(os.path.dirname(os.path.realpath(__file__)), "products.json")
    if os.path.exists(products_store):
        with open(products_store, "r") as rfile:
            default_product_details = json.load(rfile)
    else:
        print("[create_default_products] Default default product file not found.")
        return
    for product in default_product_details.get("products", []):
        if session.query(Product).filter(Product.name == product["basic"]["name"]).first():
            print(f"[create_default_products] Product {product['basic']['name']} already exists, hence skipping")
            continue
        product_info = Product(**product['basic'])
        print(f"[create_default_products] Product info prepared is :: {product_info}")
        specification_info = prepare_product_specification(product_info=product_info,
                                                           specification_info=product["specification_info"])
        specification_info.products = product_info
        print(f"[create_default_products] Product Specification info prepared is :: {specification_info}")
        session.add(product_info)
        session.add(specification_info)
        if product.get("alternate_purchase_options"):
            purchase_options = prepare_alternate_purchase_options(product_info=product_info, alternate_purchase_options=product["alternate_purchase_options"])
            for purchase_option in purchase_options:
                session.add(purchase_option)        
    session.commit()


def create_product_reviews():
    """
     To add the default reviews to the product
    """
    print("[create_product_reviews] Creating product reviews")
    products_review_store = os.path.join(os.path.dirname(os.path.realpath(__file__)), "reviews.json")
    if os.path.exists(products_review_store):
        with open(products_review_store, "r") as rfile:
            default_reviews = json.load(rfile)
    else:
        print("[create_product_reviews] Default review file not found.")
        return
    products = session.query(Product).all()
    for product in products:
        if session.query(ProductReviews).filter(ProductReviews.product_id == product.product_id).first():
            print("[create_product_reviews] product review already exists for product {}".format(product.name))
            continue
        else:
            for review in default_reviews.get("reviews", []):
                product_review = ProductReviews(**review)
                product_review.product_id = product.product_id
                product_review.review_date = datetime.datetime.strptime(review["review_date"], "%Y-%m-%d %H:%M:%S")
                session.add(product_review)
    session.commit()


def create_default_categories():
    """
     To add the default categories to the database.
    """
    print("[create_default_categories] Creating default cateogry if not existing")
    category_store = os.path.join(os.path.dirname(os.path.realpath(__file__)), "categories.json")
    if os.path.exists(category_store):
        with open(category_store, "r") as rfile:
            category_list = json.load(rfile)
    else:
        print("[create_default_categories] Default category file not found.")
        return
    if category_count:= session.query(Category).count():
        print("[create_default_categories] Categories already exists : {category_count}")
        return
    for category in category_list["categories"]:
        session.add(Category(**category))
    session.commit()

if __name__ == "__main__":
    create_default_products()
