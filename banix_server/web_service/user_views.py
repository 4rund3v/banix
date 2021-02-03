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
def get_users(current_user_info):
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
def create_user(current_user_info):
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
        if not new_user_info.username:
            new_user_info.username =  new_user_info.display_name
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
def get_specific_user(current_user_info, user_id):
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



@user_blueprint.route("/api/user-profile")
@user_blueprint.route("/user-profile")
@token_required
def fetch_user_profile(current_user_info):
    print(f" Fetching the profile information for the user : {current_user_info} ")
    user_info = {}
    user_info["display_name"] = current_user_info["display_name"]
    user_info["username"] = current_user_info["username"]
    user_info["email_id"] = current_user_info["email_id"]
    user_info["display_name"] = current_user_info["display_name"]
    user_info["primary_mobile_number"] = current_user_info["primary_mobile_number"]
    return {"user_info": user_info}



@user_blueprint.route("/api/user-profile", methods=["PUT"])
@user_blueprint.route("/user-profile", methods=["PUT"])
@token_required
def update_user_profile(current_user_info):
    print(f" Updating the user profile information : {current_user_info} ")
    form_data = request.get_json()
    session = None
    modified_user_info = {}
    print(f"In the Updation of the user profile of the Users : {form_data}")
    if "display_name" in form_data:
        modified_user_info["display_name"] = form_data["display_name"]
    if "primary_mobile_number" in form_data:
        modified_user_info["primary_mobile_number"] = form_data["primary_mobile_number"]
    print(f"Update info prepared is : {modified_user_info}")
    try:
        if modified_user_info:
            session = Session()
            resp = session.query(User).filter(User._id == current_user_info['_id']).update(modified_user_info)
            print(f"[update_user_profile] The db updated info is : {resp}")
            session.commit()
        else:
            print(f"[update_user_profile] no info to update")
    except Exception as ex:
        print("[update_user_profile] Exception: {}".format(ex))
    finally:
        if session:
            session.close()
    user_info = session.query(User).filter(User._id == current_user_info['_id']).first()
    return {"user_info": user_info.as_dict()}





