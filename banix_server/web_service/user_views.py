from flask import Flask, jsonify, abort, Blueprint
import json
import os
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
