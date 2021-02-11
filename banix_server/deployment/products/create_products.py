import os
import sys
import json
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Product
from src.db_utils import session

def create_default_products():
    PRODUCTS_STORE = os.path.join(os.path.dirname(os.path.realpath(__file__)), "products.json")

    product_details = {}
    with open(PRODUCTS_STORE, "r") as rfile:
        product_details = json.load(rfile)

    if product_details.get("products"):
        for product in product_details["products"]:
            info = Product(**product)
            print(f"[create_default_products] Product info prepared is :: {info}")
            session.add(info)

    session.commit()

if __name__ == "__main__":
    create_default_products()
