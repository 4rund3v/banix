import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Orders, OrderItem, OrderShippingInfo
from src.db_utils import Session, engine
from authorization import token_required
from flask import Flask, jsonify, abort, Blueprint, request
import json
import uuid
order_blueprint = Blueprint("orders", __name__)


@order_blueprint.route("/orders", methods=["POST"])
@token_required
def create_an_order(current_customer_info):
    print(f"[create_an_order] The customer : {current_customer_info['customer_id']} creating an order ")
    form_data = request.get_json()
    session = None
    for order_items in form_data["order_items"]:
        print(order_items)
    return {}
