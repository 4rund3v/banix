from flask import Flask, jsonify, abort, Blueprint
import json
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from commons.db_models import User
from commons.utils import Session, engine

user_blueprint = Blueprint("users", __name__)


@user_blueprint.route("/users")
def get_users():
    session = None
    print("get_users")
    try:
        session = Session()
        users = session.query(User).all()
        result = {"users": [{"id": u.id, "name": u.name, "password": u.password} for u in users]}
        print("[get_users] result: {}".format(result))
        return result
    except Exception as ex:
        print("[get_users] Exception: {}".format(ex))
    finally:
        if session: session.close()
