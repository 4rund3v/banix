import os
import sys
import json

if os.name == "posix":
    BUILD_PATH = "/opt/banix"
else:
    BUILD_PATH = "C:\\Projects\\banix\\banix_server"

sys.path.append(BUILD_PATH)
from commons.db_models import *
from commons.utils import *

PRODUCTS_STORE = os.path.join(BUILD_PATH, "deployment", "products", "products.json")

product_details = {}
with open(PRODUCTS_STORE, "r") as rfile:
    product_details = json.load(rfile)

if product_details.get("products"):
    for product in product_details["products"]:
        info = Product(name=product["name"], image=product["image"], description=product["description"], 
                       brand=product["brand"], category=product["category"], rating=product["rating"],
                       total_reviews=product["total_reviews"], price=product["price"], stock=product["stock"],
                       offer=product["offer"])
        session.add(info)
    
    session.commit()