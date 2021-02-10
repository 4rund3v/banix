from flask import Flask, jsonify , abort, Blueprint, request
import json
import os
import sys
import uuid
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Product
from src.db_utils import Session, engine
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Customer
from src.db_utils import Session, engine
from authorization import token_required
from src.shiprocket import shiprocket_client_session as scs

order_blueprint = Blueprint("orders", __name__)



product_blueprint = Blueprint("products", __name__)


@product_blueprint.route("/products")
def fetch_products():
    """
     To fetch the products and return to the ui
    """
    session = None
    result = {"products": []}
    try:
        session = Session()
        products = session.query(Product).all()
        result["products"] = [p.as_dict() for p in products]
    except Exception as ex:
        print("[fetch_products] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    return result


@product_blueprint.route("/products/<product_id>")
def fetch_specific_product(product_id):
    session = None
    result = {"product": {}}
    print("[fetch_specific_product] product_id: {}".format(product_id))
    try:
        session = Session()
        product = session.query(Product).filter(Product.product_id == product_id).first()
        if product:
            result["product"] = product.as_dict()
        print(f"[fetch_specific_product] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[fetch_specific_product] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


# @product_blueprint.route("/products/<product_id>/serviceability", methods=["GET"])
@product_blueprint.route("/products/<product_id>/serviceability", methods=["GET"])
def check_product_serviceability(product_id):
    dst_pin_code = request.args.get('pin_code')
    print(f"[check_product_serviceability] The serviceability request was made for product [{product_id}]"
          f" for the dst pin code [{dst_pin_code}]")
    serviceablity = scs.check_serviceability(src_pin_code=560036, dst_pin_code=dst_pin_code)
    return serviceablity
