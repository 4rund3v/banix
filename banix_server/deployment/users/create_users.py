import os
import sys
import json
import uuid
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from commons.db_models import User
from commons.utils import session

def create_default_users():
    USER_STORE = os.path.join(os.path.dirname(os.path.realpath(__file__)), "users.json")

    user_details = {}
    with open(USER_STORE, "r") as rfile:
        user_details = json.load(rfile)

    if user_details.get("users"):
        for user in user_details["users"]:
            info = User(**user)
            info.public_id = str(uuid.uuid4())
            print(f"[create_default_users] User info prepared is :: {info}")
            session.add(info)
    session.commit()

if __name__ == "__main__":
    create_default_users()
