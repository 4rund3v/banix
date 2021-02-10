import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Customer
from src.db_utils import Session, engine
from authorization import token_required
from flask import Flask, jsonify, abort, Blueprint, request
import json

import uuid
customer_blueprint = Blueprint("customers", __name__)


@customer_blueprint.route("/customers")
@token_required
def get_customers(current_customer_info):
    session = None
    print("[get_customers] In the fetch of the customers")
    try:
        session = Session()
        customers = session.query(Customer).all()
        result = {"customers": [c.as_dict() for c in customers]}
        print(f"[get_customers] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[get_customers] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@customer_blueprint.route("/customer/profile")
@token_required
def fetch_customer_profile(current_customer_info):
    print(f"[fetch_customer_profile] Fetching the profile information for the customer : {current_customer_info} ")
    customer_info = {}
    customer_info["display_name"] = current_customer_info["display_name"]
    customer_info["username"] = current_customer_info["username"]
    customer_info["email_id"] = current_customer_info["email_id"]
    customer_info["display_name"] = current_customer_info["display_name"]
    customer_info["primary_mobile_number"] = current_customer_info["primary_mobile_number"]
    return {"customer_info": customer_info}



@customer_blueprint.route("/customer/profile", methods=["PUT"])
@token_required
def update_customer_profile(current_customer_info):
    print(f"[update_customer_profile] Updating the customer profile information : {current_customer_info} ")
    form_data = request.get_json()
    session = None
    modified_customer_info = {}
    print(f" [update_customer_profile] In the Updation of the customer profile of the Customers : {form_data}")
    if "display_name" in form_data:
        modified_customer_info["display_name"] = form_data["display_name"]
    if "primary_mobile_number" in form_data:
        modified_customer_info["primary_mobile_number"] = form_data["primary_mobile_number"]
    print(f" [update_customer_profile] Update info prepared is : {modified_customer_info}")
    try:
        if modified_customer_info:
            session = Session()
            resp = session.query(Customer).filter(Customer._id == current_customer_info['_id']).update(modified_customer_info)
            print(f"[update_customer_profile] The db updated info is : {resp}")
            session.commit()
        else:
            print(f"[update_customer_profile] no info to update")
    except Exception as ex:
        print("[update_customer_profile] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    customer_info = session.query(Customer).filter(Customer._id == current_customer_info['_id']).first()
    return {"customer_info": customer_info.as_dict()}