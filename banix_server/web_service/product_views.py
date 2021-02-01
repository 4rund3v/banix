from flask import Flask, jsonify, abort, Blueprint
import json
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from commons.db_models import Product
from commons.utils import Session, engine

product_blueprint = Blueprint("products", __name__)

@product_blueprint.route("/api/products")
@product_blueprint.route("/products")
def fetch_products():
    """
     To fetch the products and return to the ui
    """
    session = None
    try:
        session = Session()
        products = session.query(Product).all()
        result = {"products": [p.as_dict() for p in products]}
        print(f"[fetch_products] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[fetch_products] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@product_blueprint.route("/api/products/<product_id>")
@product_blueprint.route("/products/<product_id>")
def fetch_specific_product(product_id):
    session = None
    result = {"product": {}}
    print("[fetch_specific_product] product_id: {}".format(product_id))
    try:
        session = Session()
        product =  session.query(Product).filter(Product._id == product_id).first()
        if product:
            result["product"] = product.as_dict()
        print(f"[fetch_specific_product] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[fetch_specific_product] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
