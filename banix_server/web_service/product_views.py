from flask import Flask, jsonify , abort, Blueprint, request
import json
import os
import sys
import uuid
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import (Product, ProductMedia, ProductVariant, ProductCarouselMedia,
                        ProductDemonstrationMedia, ProductDimensions, ProductBoxDimensions, ProductSpecification)
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
        for product in products:
            prod = product.as_dict()
            product_media = session.query(ProductMedia).filter(ProductMedia.products == product).first()
            if product_media:
                print(f"[fetch_products] product media is : {product_media}")
                prod["product_media"] = product_media.to_dict()
            result["products"].append(prod)
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
        product = session.query(Product,).filter(Product.product_id == product_id).first()
        if product:
            result["product"] = product.as_dict()
            product_media = session.query(ProductMedia).filter(ProductMedia.products == product).first()
            if product_media:
                print(f"product media is : {product_media}")
                result["product"]["product_media"] = product_media.to_dict()
                for pcm in session.query(ProductCarouselMedia).filter(ProductCarouselMedia.product_media == product_media).all():
                    result["product"]["product_media"]["product_carousel_media"].append(pcm.to_dict())
                result["product"]["product_media"]["product_carousel_media"].sort(key=lambda m: m["media_type"])
        print(f"[fetch_specific_product] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[fetch_specific_product] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@product_blueprint.route("/products/serviceability", methods=["GET"])
def check_product_serviceability():
    product_id = request.args.get('product_id')
    dst_pin_code = request.args.get('pin_code')
    print(f"[check_product_serviceability] The serviceability request was made for product_id [{product_id}]"
          f" for the dst pin code [{dst_pin_code}]")
    session = None
    serviceablity = {}
    try:
        session = Session()
        product_specification = session.query(ProductSpecification).filter_by(product_foreign_id=product_id).first()
        print(f"[check_product_serviceability] the product specification fetched is : {product_specification} {product_specification.as_dict()}")
        product_weight = round(( product_specification.product_box_dimensions.weight )/1000, 2) 
        serviceablity = scs.check_serviceability(product_weight=product_weight,
                                                 src_pin_code=560036,
                                                 dst_pin_code=dst_pin_code)
    except Exception as ex:
        print(f"[check_product_serviceability] Unable to fetch the product serviceablity : {ex}")
    finally:
        if session:
            session.close()
    return serviceablity
