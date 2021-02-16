import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Orders, OrderItem, OrderShippingInfo, PaymentType
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
    print(f"[create_an_order] The form data recieved to create an order is {form_data}")
    new_order = Orders(order_customer_id=current_customer_info["customer_id"])
    print(f"Order Created is : {new_order}")
    payment_type = PaymentType(orders=new_order,
                               method_name=form_data["order_payment_id"]["paymentMethod"])
    print(f"Paypal Created is : {new_order}")
    print(f"Payment Type Created is : {payment_type}")

    for order_item in form_data["order_items"]:
        print(order_item)
        order_item_total_price=order_item.qty * order_item.productSellingPrice  + 100
        order_item_shipping_price = 100
        order_item_selling_price = order_item.qty * order_item.productSellingPrice
        new_order_item = OrderItem(orders=new_order,
                                   product_id=order_item.productId,
                                   order_item_total_price = order_item_total_price,
                                   order_item_selling_price =order_item_selling_price,
                                   order_item_shipping_price =order_item_shipping_price,
                                   order_item_quantity = order_item.qty)
        session.add(new_order_item)
    session.add(payment_type)
    session.add(new_order)
    return {}
