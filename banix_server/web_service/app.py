from flask import Flask, jsonify, abort
import json
import os
import sys

if os.name == "posix":
    BUILD_PATH = "/opt/banix"
else:
    BUILD_PATH = "C:\\Projects\\banix\\banix_server"

sys.path.append(BUILD_PATH)
from commons.db_models import *
from commons.utils import *

app = Flask(__name__)

@app.route("/api/products/<product_id>")
@app.route("/api/products")
def fetch_products(product_id=""):
    """
     To fetch the products and return to the ui
    """
    #check_authorized()
    session = None
    print("fetch_products product_id: {}".format(product_id))
    try:
        session = Session()
        if product_id:
            products = session.query(Product).filter(Product.id == product_id).all()
        else:
            products = session.query(Product).all()
        result = {"products": [{"id": p.id, "name": p.name, "image": p.image, "description": p.description,
                             "brand": p.brand, "category": p.category, "rating": p.rating, "total_reviews": p.total_reviews,
                             "price": p.price, "stock": p.stock, "offer": p.offer} for p in products]}
        return result
    except Exception as ex:
        print("[fetch_products] Exception: {}".format(ex))
    finally:
        if session: session.close()


@app.route("/users")
def get_users():
    #check_authorized()
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
