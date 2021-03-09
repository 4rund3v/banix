from flask import  jsonify, abort, Blueprint, request, make_response
import os
import re
import sys
import uuid
import jwt
from datetime import datetime, timedelta
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from configuration import SECRET_KEY
from src.models import Customer, Role
from src.db_utils import Session
from src.logger import get_logger

logger = get_logger("web_app")


auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/customers/login", methods=["POST"])
def authenticate_customer_login():
    logger.debug("[authenticate_customer_login] At the Customer login place")
    form_data = request.get_json()
    logger.debug(f"[authenticate_customer_login] Posted form data is : {form_data} ")
    session = None
    result = {"customer_info": {}}
    try:
        session = Session()
        customer = session.query(Customer).filter(Customer.email_id == form_data["email_id"]).first()
        if customer:
            if customer.password == form_data["password"]:
                result["customer_info"] = customer.to_dict()
                token = jwt.encode(dict(public_id=customer.public_id,
                                        exp=datetime.utcnow() + timedelta(minutes=300)),
                                   SECRET_KEY)
                result["token"] = token.decode("UTF-8")
                logger.debug(f"[authenticate_customer_login] The result prepared is :: {result}")
                return result
            else:
                abort(make_response(jsonify(message="Invalid password provided."), 401))
        else:
            abort(make_response(jsonify(message="Email address not registered."), 401))        
    except ValueError as ve:
        logger.exception("[authenticate_customer_login] ValueError: {}".format(ve))
    finally:
        if session:
            session.close()
    abort(make_response(jsonify(message="Invalid details provided."), 401))


@auth_blueprint.route("/customer/login/status", methods=["GET"])
def check_customer_login_status():
    token = None
    session = None
    current_customer_info = None
    # jwt is passed in the request header
    if 'Authorization' in request.headers:
        token = request.headers['Authorization']
        token = re.sub("^(Bearer )", "", token)
        logger.debug(f"[check_customer_login_status] token received is ::: {token}")
    # return 401 if token is not passed
    else:
        return jsonify({'message': 'Token is missing !!'}), 401
    logger.debug(f"[check_customer_login_status] Decoding the token !! {token}")
    try:
        # decoding the payload to fetch the stored details
        data = jwt.decode(token, SECRET_KEY)
        logger.debug(f"[check_customer_login_status] The data[public_id] decoded is ::: {data['public_id']}")
        session = Session()
        current_customer = session.query(Customer).filter_by(public_id=data['public_id']).first()
        current_customer_info = current_customer.to_dict()
    except Exception as ex:
        logger.exception(f"[token_required] Error decoding the data ::: {ex}")
        return jsonify({'message': 'Token is invalid !!'}), 401
    finally:
        if session:
            session.close()
    # returns the current logged in customers context to the routes
    return {"customer_info": current_customer_info}


@auth_blueprint.route("/customers/register", methods=["POST"])
def register_customer():
    session = None
    form_data = request.get_json()
    logger.debug(f"[register_customer ]In the creation of the Customer : {form_data}")
    try:
        session = Session()
        existing_customer = session.query(Customer).filter(Customer.email_id == form_data["email_id"]).first()
        if existing_customer:
            abort(make_response(jsonify(message='Email Address already registered, Try Login'), 401))
        new_customer_info = Customer(display_name=form_data["display_name"],
                                     username=form_data["display_name"],
                                     email_id=form_data["email_id"],
                                     password=form_data["password"])
        customer_role = Role(customers=new_customer_info,
                             role_name="customers")
        new_customer_info.public_id = str(uuid.uuid4())
        if not new_customer_info.display_name:
            new_customer_info.display_name = new_customer_info.email_id.split("@")[0]
        session.add(customer_role)
        session.add(new_customer_info)
        logger.debug(f"[register_customer] Customer added to database response  is :: {new_customer_info}")
        session.commit()
        result = {"customer_info": new_customer_info.to_dict()}
        logger.debug(f"[register_customer] The result prepared is :: {result}")
        token = jwt.encode(dict(public_id=new_customer_info.public_id, exp=datetime.utcnow() + timedelta(minutes=300)),
                           "banix")
        result["token"] = token.decode("UTF-8")
        return result
    except ValueError as ex:
        logger.exception(f"[register_customer] Exception: {ex}")
    finally:
        if session:
            session.close()
