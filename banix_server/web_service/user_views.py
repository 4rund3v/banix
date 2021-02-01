from flask import Flask, jsonify, abort, Blueprint, request
import json
import os
import uuid
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from commons.db_models import User
from commons.utils import Session, engine
from authorization import token_required
user_blueprint = Blueprint("users", __name__)


@user_blueprint.route("/api/users")
@user_blueprint.route("/users")
@token_required
def get_users():
    session = None
    print("In the fetch of the Users")
    try:
        session = Session()
        users = session.query(User).all()
        result = {"users": [u.as_dict() for u in users]}
        print(f"[get_users] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[get_users] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@user_blueprint.route("/api/users", methods=["POST"])
@user_blueprint.route("/users", methods=["POST"])
@token_required
def create_user():
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
        result = {"user": new_user_info.as_dict()}
        print(f"[create_user] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[get_users] Exception: {}".format(ex))
    finally:
        if session:
            session.close()


@user_blueprint.route("/api/users/<user_id>")
@user_blueprint.route("/users/<user_id>")
@token_required
def get_specific_user(user_id):
    session = None
    print(f"[get_specific_user] In the fetch of the Specific User {user_id}")
    try:
        session = Session()
        user = session.query(User).filter(User._id == user_id).first()
        result = {"user": user.as_dict()}
        print(f"[get_specific_user] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[get_specific_user] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    return {}
