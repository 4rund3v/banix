import os
import sys
import json
import datetime
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Product, ProductSpecification, ProductDimensions, ProductBoxDimensions, ProductReviews
from src.db_utils import session


def prepare_product_specification(session, product_info, specification_info):
    product_specification = ProductSpecification(products=product_info)
    product_specification.product_description = specification_info["description"]
    product_specification.product_box_contents = specification_info["product_box_contents"]
    product_dimensions = ProductDimensions(**specification_info["product_dimensions"])
    product_dimensions.product_specification = product_specification
    product_box_dimensions = ProductBoxDimensions(**specification_info["product_box_dimensions"])
    product_box_dimensions.product_specification = product_specification
    return product_specification


def create_default_products():
    PRODUCTS_STORE = os.path.join(os.path.dirname(os.path.realpath(__file__)), "products.json")

    product_details = {}
    with open(PRODUCTS_STORE, "r") as rfile:
        product_details = json.load(rfile)

    if product_details.get("products"):
        for product in product_details["products"]:
            if session.query(Product).filter(Product.name == product["basic"]["name"]).first():
                print("Product {} already exists, hence skipping".format(product["basic"]["name"]))
                continue
            product_info = Product(**product["basic"])
            print(f"[create_default_products] Product info prepared is :: {product_info}")
            specification_info = prepare_product_specification(session=session,
                                                               product_info=product_info,
                                                               specification_info=product["specification_info"])
            specification_info.products = product_info
            print(f"[create_default_products] Product Specification info prepared is :: {specification_info}")
            session.add(product_info)
            session.add(specification_info)

    session.commit()

def create_product_reviews():
    print("[create_product_reviews] Creating product reviews")
    products = session.query(Product).all()
    for product in products:
        
        if session.query(ProductReviews).filter(ProductReviews.product_id == product.product_id).first():
            print("[create_product_reviews] product review already exists for product {}".format(product.name))
            continue
        else:
            reviews = {}
            PRODUCTS_REVIEW_STORE = os.path.join(os.path.dirname(os.path.realpath(__file__)), "reviews.json")
            with open(PRODUCTS_REVIEW_STORE, "r") as rfile:
                reviews = json.load(rfile)

            if reviews.get("reviews"):
                for review in reviews["reviews"]:
                    product_review = ProductReviews(**review)
                    product_review.product_id = product.product_id
                    product_review.review_date = datetime.datetime.strptime(review["review_date"], "%Y-%m-%d %H:%M:%S")
                    session.add(product_review)
                    session.commit()


if __name__ == "__main__":
    create_default_products()
    create_product_reviews()