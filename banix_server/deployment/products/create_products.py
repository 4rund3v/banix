import os
import sys
import json
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Product, ProductSpecification, ProductDimensions, ProductBoxDimensions
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

if __name__ == "__main__":
    create_default_products()
