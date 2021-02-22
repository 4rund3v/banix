from flask import Flask, jsonify, abort, Blueprint, request, make_response
import json
import os
import sys
import uuid
import jwt
from datetime import datetime, timedelta

build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)

from src.models import Customer, Role
from src.db_utils import Session, engine

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/customers/login", methods=["POST"])
def authenticate_customer_login():
    print("[authenticate_customer_login] At the Customer login place")
    form_data = request.get_json()
    print(f"[authenticate_customer_login] Posted form data is : {form_data} ")
    session = None
    result = {"customer_info": {}}
    try:
        session = Session()
        customer = session.query(Customer).filter(Customer.email_id == form_data["email_id"]).first()
        if customer:
            if customer.password == form_data["password"]:
                result["customer_info"] = customer.to_dict()
                token = jwt.encode({'public_id': customer.public_id,
                                'exp': datetime.utcnow() + timedelta(minutes=300)},
                               "banix")
                result["token"] = token.decode("UTF-8")
                print(f"[authenticate_customer_login] The result prepared is :: {result}")
                return result
            else:
                abort(make_response(jsonify(message="Invalid password provided."), 401))
        else:
            abort(make_response(jsonify(message="Email address not registered."), 401))        
    except ValueError as ve:
        print("[authenticate_customer_login] ValueError: {}".format(ve))
    finally:
        if session:
            session.close()
    abort(make_response(jsonify(message="Invalid details provided."), 401))


@auth_blueprint.route("/customers/register", methods=["POST"])
def register_customer():
    session = None
    form_data = request.get_json()
    print(f"[register_customer ]In the creation of the Customer : {form_data}")
    try:
        session = Session()
        existing_customer = session.query(Customer).filter(Customer.email_id == form_data["email_id"]).first()
        if existing_customer:
            abort(make_response(jsonify(message='Email Address already registered, Try Login'), 401))
        new_customer_info = Customer(display_name=form_data["display_name"],
                                     username=form_data["display_name"],
                                     email_id=form_data["email_id"],
                                     password=form_data["password"])
        print("New Customer Info : ", new_customer_info)
        customer_role = Role(customers=new_customer_info,
                             role_name="customers")
        print("Linking Role: ", customer_role)
        new_customer_info.public_id = str(uuid.uuid4())
        if not new_customer_info.display_name:
            new_customer_info.display_name = new_customer_info.email_id.split("@")[0]
        print(f"[register_customer] Customer info prepared is :: {new_customer_info}")
        session.add(customer_role)
        session.add(new_customer_info)
        print(f"[register_customer] Customer added to database response  is :: {new_customer_info}")
        session.commit()
        result = {"customer_info": new_customer_info.to_dict()}
        print(f"[register_customer] The result prepared is :: {result}")
        token = jwt.encode({'public_id': new_customer_info.public_id,
                            'exp': datetime.utcnow() + timedelta(minutes=300)
                            }, "banix")
        result["token"] = token.decode("UTF-8")
        return result
    except ValueError as ex:
        print("[register_customer] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
