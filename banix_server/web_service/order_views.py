import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Orders, OrderPrice, OrderStatus, OrderItem, OrderShippingInfo, Address, PaymentInfo
from src.db_utils import Session, engine
from src.price_functions import fetch_complete_price_details
from src.constants import ORDER_PLACED_STATUS
from authorization import token_required
from flask import Flask, jsonify, abort, Blueprint, request
import json
import uuid
import math
import datetime
import razorpay

order_blueprint = Blueprint("orders", __name__)
razorpay_client = razorpay.Client(auth=("rzp_test_1VGt9vNNSuXQ5X", "mtsqE135B0YEQEzBsRiPNZgl"))

@order_blueprint.route("/prepare-order", methods=['POST'])
@token_required
def preape_order_info(current_customer_info):
    result = {}
    result["order_info_id"] = str(uuid.uuid4())
    result["product_price_info"] = []
    session = None
    try:
        form_data = request.get_json()
        print(f"[preape_order_info] The form data recieved is : {form_data}")
        session = Session()
        dst_pin_code = form_data["pin_code"]
        result["pin_code"] = dst_pin_code
        result["customer_id"] = current_customer_info["customer_id"]
        result["total_selling_price"] = result["total_tax_price"] = result["total_shipping_price"] = result["total_price"] = 0
        for cart_item in form_data.get("cart_items", []):
            product_price_info = {}
            product_price_info["product_id"] = cart_item["product_id"]
            product_price_info["product_qty"] = cart_item["product_qty"]
            product_price_info["price_details"] = fetch_complete_price_details(session,product_id=cart_item["product_id"],
                                                                               qty=cart_item["product_qty"],
                                                                               dst_pin_code=dst_pin_code)
            result["total_selling_price"] += product_price_info["price_details"]["selling_price"]
            result["total_tax_price"] += product_price_info["price_details"]["tax_price"] 
            result["total_shipping_price"] += product_price_info["price_details"]["shipping_price"]
            result["total_price"] += product_price_info["price_details"]["total_price"]
            result["product_price_info"].append(product_price_info)   
        payment_info = razorpay_client.order.create(data={
            "amount" : result["total_price"]*100,
            "currency": "INR",
            "receipt": result["order_info_id"],
            "notes": {"customer_id": current_customer_info['customer_id'],"total_price": result["total_price"]}
            })
        print(f"[preape_order_info] Payment info is :: {payment_info}")
        result["payment_info"] = payment_info
    except Exception as ex:
       print(f"[preape_order_info] Unable TO prepare the order info : {ex}")
    finally:
        if session:
            session.close() 
    return result


@order_blueprint.route("/orders", methods=["POST"])
@token_required
def create_order(current_customer_info):
    result = {}
    print(f"[create_order] The customer : {current_customer_info['customer_id']} creating an order ")
    form_data = request.get_json()
    session = None
    try:
        session = Session()
        print(f"[create_order] The form data recieved to create an order is {form_data}")
        new_order = Orders(order_customer_id=current_customer_info["customer_id"])
        new_order.order_info_id = form_data["order_info_id"]
        order_price = OrderPrice(orders=new_order)
        order_price.order_total_price = form_data["order_price"]["total_price"]
        order_price.order_selling_price = form_data["order_price"]["total_selling_price"]
        order_price.order_shipping_price = form_data["order_price"]["total_shipping_price"]
        order_price.order_tax_price = form_data["order_price"]["total_tax_price"]
        session.add(order_price)
        order_status = OrderStatus(orders=new_order)
        order_status.status = ORDER_PLACED_STATUS
        new_order.order_date = str(datetime.datetime.now())
        shipping_address = Address(**form_data["order_shipping_address"])
        print(f"[create_order] Shipping Address Created is : {shipping_address}")
        new_order.order_shipping_address = shipping_address
        # payment_info = PaymentInfo(orders=new_order,
        #                            payment_gateway=form_data["order_payment_info"]["payment_gateway"],
        #                            payment_method=form_data["order_payment_info"]["payment_method"],
        #                            payment_transaction_id=form_data["order_payment_info"]["payment_transaction_id"])
        # print(f"[create_order] PaymentInfo Created is : {payment_info}")
        for order_item in form_data["order_items"]:
            print(f"[create_order] Order item is  :: {order_item}")
            new_order_item = OrderItem(orders=new_order,
                                       order_product_foreign_id=order_item["product_id"],
                                       order_item_quantity = order_item["qty"],                                       
                                       order_item_selling_price = order_item["selling_price"],
                                       order_item_shipping_price = order_item["shipping_price"],
                                       order_item_tax_price = order_item["tax_price"],
                                       order_item_total_price = order_item["total_price"],
                                       )
            session.add(new_order_item)
        session.add(shipping_address)
        # session.add(payment_info)
        session.add(new_order)
        session.commit()
        print(f"[create_order] Order Created is : {new_order}")
        result["order_info"] = {"order_id": new_order.order_id, "order_info_id": new_order.order_info_id}
    except Exception as ex:
        print(f"[create_order] Exception while creating an order : {ex}")    
    finally:
        if session:
            session.close()
    return result

@order_blueprint.route("/customers/orders")
@order_blueprint.route("/customers/orders/<order_id>")
@token_required
def fetch_customer_orders(current_customer_info: dict, order_id: str = None) -> dict:
    """
     to fetch the orders for the customer
    """
    result = {}
    result["orders"] = []
    session = None
    try:
        session = Session()
        print(f"[fetch_customer_orders] The customer : {current_customer_info['customer_id']} requesting orders {order_id}")
        if order_id:
            if order := session.query(Orders).filter_by(order_id=order_id).filter_by(order_customer_id=current_customer_info["customer_id"]).first():
                print(f"[fetch_customer_orders] The order info fetched is :: {order}")
                result["order"] = order.to_dict()
        else:
            for order in session.query(Orders).filter_by(order_customer_id=current_customer_info["customer_id"]).all():
                print(f"[fetch_customer_orders] The order info fetched is :: {order}")
                result["orders"].append(order.to_dict())
    except Exception as ex:
        print(f"[fetch_customer_orders] Exception while fetching the order info : {ex}")    
    finally:
        if session:
            session.close()
    print(f"[fetch_customer_orders] the orders returned are :: {result}")
    return result