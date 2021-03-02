from flask import Flask, jsonify, abort, Blueprint, request
from sqlalchemy import desc
import json
import os
import sys
import uuid
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Customer, Address
from src.db_utils import Session, engine
from authorization import token_required

customer_blueprint = Blueprint("customers", __name__)

@customer_blueprint.route("/customers")
@token_required
def get_customers(current_customer_info):
    session = None
    print("[get_customers] In the fetch of the customers")
    try:
        session = Session()
        customers = session.query(Customer).all()
        result = {"customers": [c.to_dict() for c in customers]}
        print(f"[get_customers] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[get_customers] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@customer_blueprint.route("/customers/profile")
@token_required
def fetch_customer_profile(current_customer_info):
    print(f"[fetch_customer_profile] Fetching the profile information for the customers : {current_customer_info} ")
    customer_info = {}
    customer_info["display_name"] = current_customer_info["display_name"]
    customer_info["username"] = current_customer_info["username"]
    customer_info["email_id"] = current_customer_info["email_id"]
    customer_info["display_name"] = current_customer_info["display_name"]
    customer_info["primary_mobile_number"] = current_customer_info["primary_mobile_number"]
    return {"customer_info": customer_info}



@customer_blueprint.route("/customers/profile", methods=["PUT"])
@token_required
def update_customer_profile(current_customer_info):
    print(f"[update_customer_profile] Updating the customers profile information : {current_customer_info} ")
    form_data = request.get_json()
    session = None
    modified_customer_info = {}
    print(f" [update_customer_profile] In the Updation of the customers profile of the Customers : {form_data}")
    if "display_name" in form_data:
        modified_customer_info["display_name"] = form_data["display_name"]
    if "primary_mobile_number" in form_data:
        modified_customer_info["primary_mobile_number"] = form_data["primary_mobile_number"]
    print(f" [update_customer_profile] Update info prepared is : {modified_customer_info}")
    try:
        if modified_customer_info:
            session = Session()
            resp = session.query(Customer).filter(Customer.customer_id == current_customer_info['customer_id']).update(modified_customer_info)
            print(f"[update_customer_profile] The db updated info is : {resp}")
            session.commit()
        else:
            print(f"[update_customer_profile] no info to update")
    except Exception as ex:
        print("[update_customer_profile] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    customer_info = session.query(Customer).filter(Customer.customer_id == current_customer_info['customer_id']).first()
    return {"customer_info": customer_info.to_dict()}



@customer_blueprint.route("/customers/address", methods=["GET"])
@token_required
def fetch_customer_address(current_customer_info):
    session = None
    default_address = request.args.get("default", False)
    result = {}
    result["addresses"] =[]
    result["customer_id"] = current_customer_info['customer_id']
    result["default_address"] = default_address
    print(f"[fetch_customer_address] In the fetch of the cusstomer address customer_id : {current_customer_info['customer_id']}")
    try:
        session = Session()
        if default_address:
            address = session.query(Address).filter_by(customer_id=result["customer_id"], default_address=True).first()
            if address:
                result["addresses"].append(address.to_dict())
        else:
            addresses = session.query(Address).filter_by(customer_id=result["customer_id"]).all()
            for address in addresses:
                result["addresses"].append(address.to_dict())
            result["addresses"].sort(key=lambda k: k.get("default_address"))
    except Exception as ex:
        print(f"[fetch_customer_address] Unable to fetch the addresses : {ex} ")
    finally:
        if session:
            session.close()
    return result


@customer_blueprint.route("/customers/address", methods=["POST"])
@token_required
def add_customer_address(current_customer_info):
    session = None
    result = {}
    form_data = request.get_json()
    print(f"[add_customer_address] In the creation of cusstomer address : {current_customer_info['customer_id']},new address : {form_data} ")
    try:
        session = Session()
        new_address = Address(**form_data)
        new_address.customer_id = current_customer_info['customer_id']
        session.add(new_address)
        session.commit()
        result["address_id"] = new_address.address_id
    except Exception as ex:
        print(f"[add_customer_address] Unable to fetch the addresses : {ex} ")
    finally:
        if session:
            session.close()
    return result


@customer_blueprint.route("/customers/address/<address_id>", methods=["PUT"])
@token_required
def update_customer_address(current_customer_info, address_id):
    pass