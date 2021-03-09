from flask import Blueprint, request
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Customer, Address
from src.db_utils import Session
from authorization import token_required

from src.logger import get_logger
logger = get_logger("web_app")

customer_blueprint = Blueprint("customers", __name__)


@customer_blueprint.route("/customers")
@token_required
def get_customers(current_customer_info):
    session = None
    logger.debug("[get_customers] In the fetch of the customers")
    try:
        session = Session()
        customers = session.query(Customer).all()
        result = {"customers": [c.to_dict() for c in customers]}
        logger.debug(f"[get_customers] The result prepared is :: {result}")
        return result
    except Exception as ex:
        logger.exception("[get_customers] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@customer_blueprint.route("/customers/profile")
@token_required
def fetch_customer_profile(current_customer_info):
    logger.debug(
        f"[fetch_customer_profile] Fetching the profile information for the customers : {current_customer_info} ")
    customer_info = {"display_name": current_customer_info["display_name"],
                     "username": current_customer_info["username"], "email_id": current_customer_info["email_id"],
                     "primary_mobile_number": current_customer_info["primary_mobile_number"]}
    return {"customer_info": customer_info}


@customer_blueprint.route("/customers/profile", methods=["PUT"])
@token_required
def update_customer_profile(current_customer_info):
    logger.debug(f"[update_customer_profile] Updating the customers profile information : {current_customer_info} ")
    form_data = request.get_json()
    session = None
    modified_customer_info = {}
    result = {}
    logger.debug(f" [update_customer_profile] In the Updation of the customers profile of the Customers : {form_data}")
    if "display_name" in form_data:
        modified_customer_info["display_name"] = form_data["display_name"]
    if "primary_mobile_number" in form_data:
        modified_customer_info["primary_mobile_number"] = form_data["primary_mobile_number"]
    logger.debug(f" [update_customer_profile] Update info prepared is : {modified_customer_info}")
    try:
        if modified_customer_info:
            session = Session()
            resp = session.query(Customer).filter(Customer.customer_id == current_customer_info['customer_id']).update(
                modified_customer_info)
            logger.debug(f"[update_customer_profile] The db updated info is : {resp}")
            session.commit()
        else:
            logger.debug(f"[update_customer_profile] no info to update")
        customer_info = session.query(Customer).filter(
            Customer.customer_id == current_customer_info['customer_id']).first()
        result["customer_info"] = customer_info.to_dict()
    except Exception as ex:
        logger.exception("[update_customer_profile] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    return result


@customer_blueprint.route("/customers/profile/password", methods=["PUT"])
@token_required
def update_customer_password(current_customer_info):
    logger.debug(f"[update_customer_password] Updating the customers password information : {current_customer_info} ")
    form_data = request.get_json()
    session = None
    modified_customer_info = {}
    result = {}
    logger.debug(f" [update_customer_password] In the Updation of the customers profile of the Customers : {form_data}")
    try:
        if form_data:
            session = Session()
            resp = session.query(Customer).filter(Customer.customer_id == current_customer_info['customer_id']).filter(
                Customer.password == form_data["password"]).update(
                {"password": form_data["new_password"]})
            logger.debug(f"[update_customer_password] The db updated info is : {resp}")
            session.commit()
        else:
            logger.debug(f"[update_customer_password] no info to update")
        customer_info = session.query(Customer).filter(
            Customer.customer_id == current_customer_info['customer_id']).first()
        result["customer_info"] = customer_info.to_dict()
    except Exception as ex:
        logger.exception("[update_customer_password] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    return result


@customer_blueprint.route("/customers/address", methods=["GET"])
@token_required
def fetch_customer_address(current_customer_info):
    session = None
    default_address = request.args.get("default", False)
    result = {}
    result["addresses"] = []
    result["customer_id"] = current_customer_info['customer_id']
    result["default_address"] = default_address
    logger.debug(
        f"[fetch_customer_address] In the fetch of the customer address customer_id : {current_customer_info['customer_id']}")
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
        logger.exception(f"[fetch_customer_address] Unable to fetch the addresses : {ex} ")
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
    logger.debug(
        f"[add_customer_address] In the creation of cusstomer address : {current_customer_info['customer_id']},new address : {form_data} ")
    try:
        session = Session()
        new_address = Address(**form_data)
        new_address.customer_id = current_customer_info['customer_id']
        session.add(new_address)
        session.commit()
        result["address_id"] = new_address.address_id
    except Exception as ex:
        logger.exception(f"[add_customer_address] Unable to fetch the addresses : {ex} ")
    finally:
        if session:
            session.close()
    return result


@customer_blueprint.route("/customers/address/<address_id>", methods=["PUT"])
@token_required
def update_customer_address(current_customer_info, address_id):
    pass
