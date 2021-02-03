from flask import Flask, jsonify, abort, Blueprint, request, make_response
import json
import os
import sys
import uuid
import jwt
from datetime import datetime, timedelta
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)

from commons.db_models import User
from commons.utils import Session, engine

auth_blueprint = Blueprint("auth", __name__)



@auth_blueprint.route("/api/login", methods=["POST"])
@auth_blueprint.route("/login", methods=["POST"])
def authenticate_user_login():
    print("At the user login place")
    form_data = request.get_json()
    print(f"Posted form data is : {form_data} ")
    session = None
    result = {"user_info": {}}
    try:
        session = Session()
        user =  session.query(User).filter(User.email_id == form_data["email_id"]).filter(User.password == form_data["password"]).first()
        if user:
            result["user_info"] = user.as_dict()
            token = jwt.encode({'public_id': user.public_id, 'exp' : datetime.utcnow() + timedelta(minutes = 300)
        }, "banix")
            result["token"] = token.decode("UTF-8")
        print(f"[authenticate_user_login] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[authenticate_user_login] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    abort(make_response(jsonify(message="Invalid details provided."), 401))


@auth_blueprint.route("/api/register", methods=["POST"])
@auth_blueprint.route("/register", methods=["POST"])
def register_user():
    session = None
    print("In the creation of the Users")
    form_data = request.get_json()

    try:
        session = Session()
        existing_user = session.query(User).filter(User.email_id==form_data["email_id"]).first()
        if existing_user:
            return jsonify({ 'message' : 'User already exists !!' }), 401
        new_user_info = User(**form_data)
        new_user_info.public_id = str(uuid.uuid4())
        new_user_info.user_role = "user"
        if not new_user_info.display_name:
            new_user_info.display_name =  new_user_info.email_id.split("@")[0]
        print(f"[create_user]User info prepared is :: {new_user_info}")
        resp = session.add(new_user_info)
        print(f"User added to database response  is :: {resp}")
        session.commit()
        result = {"user_info": new_user_info.as_dict()}
        print(f"[create_user] The result prepared is :: {result}")
        token = jwt.encode({'public_id': new_user_info.public_id, 'exp' : datetime.utcnow() + timedelta(minutes = 300)
        }, "banix")
        result["token"] = token.decode("UTF-8")
        return result
    except Exception as ex:
        print("[get_users] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
