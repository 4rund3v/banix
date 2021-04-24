from flask import Blueprint, request
from sqlalchemy import desc

import os
import sys
import datetime
import math

build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import (Product, ProductMedia, ProductCarouselMedia, ProductSpecification, ProductReviews)
from src.utils import json_friendly
from src.db_utils import Session
from src.shiprocket import shiprocket_client_session as scs
from src.logger import get_logger

logger = get_logger("web_app")

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
        if request.args.get("latest") and request.args.get("count"):
            products = products = session.query(Product).order_by(desc(Product.product_created_datetime)).limit(int(request.args['count']))
        else:
            products = session.query(Product).all()
        for product in products:
            prod = product.to_dict()
            # product_media = session.query(ProductMedia).filter(ProductMedia.products == product).first()
            # if product_media:
            #     logger.debug(f"[fetch_products] product media is : {product_media}")
            #     prod["product_media"] = product_media.to_dict()
            #     reviews = session.query(ProductReviews).filter(ProductReviews.product_id == prod["product_id"]).all()
            #     if len(reviews) > 0:
            #         rating = 0
            #         for review in reviews:
            #             rating += review.rating
            #         prod["rating"] = math.ceil(rating/len(reviews))
            #     else:
            #         prod["rating"] = 5
            result["products"].append(prod)
    except Exception as ex:
        logger.exception("[fetch_products] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    return json_friendly(result)


@product_blueprint.route("/products/<product_id>")
def fetch_specific_product(product_id):
    session = None
    result = {"product": {}}
    logger.debug("[fetch_specific_product] product_id: {}".format(product_id))
    try:
        session = Session()
        product = session.query(Product, ).filter(Product.product_id == product_id).first()
        if product:
            result["product"] = product.to_dict()
            product_media = session.query(ProductMedia).filter(ProductMedia.products == product).first()
            if product_media:
                logger.debug(f"product media is : {product_media}")
                result["product"]["product_media"] = product_media.to_dict()
                for pcm in session.query(ProductCarouselMedia).filter(
                        ProductCarouselMedia.product_media == product_media).all():
                    result["product"]["product_media"]["product_carousel_media"].append(pcm.to_dict())
                result["product"]["product_media"]["product_carousel_media"].sort(key=lambda m: m["media_type"])
            
            reviews = session.query(ProductReviews).filter(ProductReviews.product_id == result["product"]["product_id"]).all()
            if len(reviews) > 0:
                rating = 0
                for review in reviews:
                    rating += review.rating
                result["product"]["rating"] = math.ceil(rating/len(reviews))
            else:
                 result["product"]["rating"] = 5

        logger.debug(f"[fetch_specific_product] The result prepared is :: {result}")
        return json_friendly(result)
    except Exception as ex:
        logger.exception("[fetch_specific_product] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@product_blueprint.route("/products/serviceability", methods=["GET"])
def check_product_serviceability():
    product_id = request.args.get('product_id')
    dst_pin_code = request.args.get('pin_code')
    logger.debug(f"[check_product_serviceability] The serviceability request was made for product_id [{product_id}]"
                 f" for the dst pin code [{dst_pin_code}]")
    session = None
    serviceability = {}
    try:
        session = Session()
        product_specification = session.query(ProductSpecification).filter_by(product_foreign_id=product_id).first()
        logger.debug(
            f"[check_product_serviceability] the product specification fetched is : {product_specification}"
            f" {product_specification.to_dict()}")
        product_weight = round((product_specification.product_box_dimensions.weight) / 1000, 2)
        serviceability = scs.check_serviceability(product_weight=product_weight,
                                                  src_pin_code=560036,
                                                  dst_pin_code=dst_pin_code)
    except Exception as ex:
        logger.exception(f"[check_product_serviceability] Unable to fetch the product serviceability : {ex}")
    finally:
        if session:
            session.close()
    return json_friendly(serviceability)


@product_blueprint.route("/products/<product_id>/reviews", methods=['GET'])
def get_product_review(product_id):
    session = None
    try:
        session = Session()
        print("[get_product_review] product id is {}".format(product_id))
        reviews = session.query(ProductReviews).filter(ProductReviews.product_id == product_id).order_by(ProductReviews.review_date.desc()).limit(20).all()
        product_reviews = []
        for review in reviews:
            temp = review.to_dict()
            product_reviews.append(temp)
        print("Reviews: {}".format(reviews))
        return json_friendly({"reviews": product_reviews})
    except Exception as ex:
        logger.exception("[get_product_review] Exception: {}".format(ex))
    finally:
        if session: session.close()
    return {}
    
@product_blueprint.route("/products/<product_id>/reviews", methods=['POST'])
def create_product_review(product_id):
    print("[create_product_review] product id: {}".format(product_id))
    session = None
    try:
        form_data = request.get_json()
        print("[create_product_review] form_data: {}".format(form_data))
        session = Session()
        if not form_data.get("rating"):
            raise Exception("[create_product_review] product rating is missing")

        review = ProductReviews(product_id=product_id,
                                user_id=form_data.get("user_id"),
                                rating=form_data["rating"],
                                review_date=datetime.datetime.now(),
                                comment=form_data.get("comment", ""))
        session.add(review)
        session.commit()
    except Exception as ex:
        logger.exception("[create_product_review] Exception: {}".format(ex))
    finally:
        if session: session.close()
    return {}

@product_blueprint.route("/products/reviews/<review_id>", methods=['PUT'])
def update_product_review(review_id):
    print("[update_product_review] review_id: {}".format(review_id))
    session = None
    try:
        form_data = request.get_json()
        print("[update_product_review] form_data: {}".format(form_data))
        session = Session()
        if form_data.get("comment"):
            session.query(ProductReviews).filter(ProductReviews.review_id == review_id).update({ProductReviews.comment: form_data["comment"]})
        if form_data.get("rating"):
            session.query(ProductReviews).filter(ProductReviews.review_id == review_id).update({ProductReviews.rating: form_data["rating"]})

        session.commit()
    except Exception as ex:
        logger.exception("[update_product_review] Exception: {}".format(ex))
    finally:
        if session: session.close()
    return {}

@product_blueprint.route("/products/reviews/<review_id>", methods=['DELETE'])
def delete_product_review(review_id):
    print("[delete_product_review] review_id: {}".format(review_id))
    session = None
    try:
        session = Session()
        session.query(ProductReviews).delete(ProductReviews.review_id == review_id)
        session.commit()
    except Exception as ex:
        logger.exception("[update_product_review] Exception: {}".format(ex))
    finally:
        if session: session.close()
    return {}

