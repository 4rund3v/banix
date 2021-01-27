from flask import Flask, jsonify, abort
from product_views import product_blueprint
import json
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from commons.db_models import *
from commons.utils import *

app = Flask(__name__)
#app.register_blueprint(product_blueprint)

@app.route("/api/products/<product_id>")
@app.route("/api/products")
def fetch_products(product_id=""):
    """
     To fetch the products and return to the ui
    """
    session = None
    print("fetch_products product_id: {}".format(product_id))
    try:
        session = Session()
        if product_id:
            products = session.query(Product).filter(Product.id == product_id).all()
        else:
            products =  session.query(Product).all()
        result = {"products": [p.as_dict() for p in products]}
        print(f"[fetch_products] The result prepared is :: {result}")
        return result
    except Exception as ex:
        print("[fetch_products] Exception: {}".format(ex))
    finally:
        if session: session.close()


@app.route("/users")
def get_users():
    session = None
    print("get_users")
    try:
        session = Session()
        users = session.query(User).all()
        #users = session.query(User).filter(or_(User.deleted == None, User.deleted == 0)).order_by(User.name).all()
        #result = {"users": [{"id": u.id, "name": u.name, "password": u.password, "contactNum": u.contact_no, "active": bool(u.session_id), } for u in users]}
        result = {"users": [{"id": u.id, "name": u.name, "password": u.password} for u in users]}
        print("[get_users] result: {}".format(result))
        return result
    except Exception as ex:
        print("[get_users] Exception: {}".format(ex))
    finally:
        if session: session.close()


if __name__ == "__main__":
    app.run(host="localhost", port=3300, debug=True)
