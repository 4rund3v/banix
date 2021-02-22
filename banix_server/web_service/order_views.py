import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Orders, OrderItem, OrderShippingInfo, PaymentInfo, Product, ProductSpecification, Address
from src.db_utils import Session, engine
from src.shiprocket import shiprocket_client_session as scs
from authorization import token_required
from flask import Flask, jsonify, abort, Blueprint, request
import json
import uuid
import math
import datetime
order_blueprint = Blueprint("orders", __name__)

def get_total_price(shipping_price: int, tax_price: int, selling_price: int) -> int:
    return math.ceil(shipping_price+tax_price+selling_price)

def fetch_complete_price_details(session, product_id, qty, dst_pin_code):
    product = session.query(Product).filter_by(product_id=product_id).first()
    print("[fetch_complete_price_details] Product info is :: {}".format(product.to_dict()))
    product_specification = session.query(ProductSpecification).filter_by(product_foreign_id=product_id).first()
    print(f"[fetch_complete_price_details] the product specification fetched is : {product_specification} {product_specification.to_dict()}")
    price_details = {}
    price_details["shipping_price"] = calculate_shipping_price(product_weight=product_specification.product_box_dimensions.weight,
                                                               qty=qty,
                                                               dst_pin_code=dst_pin_code)
    price_details["selling_price"] = calculate_selling_price(product.selling_price, qty)
    price_details["tax_price"] = calculate_tax(price_details["shipping_price"])
    price_details["total_price"] = get_total_price(shipping_price=price_details["shipping_price"],
                                                   tax_price=price_details["tax_price"],
                                                   selling_price=price_details["selling_price"])
    return price_details


def calculate_shipping_price(product_weight, qty, dst_pin_code):
    # product weight is in grams, convert to nearest(.1) killogram
    total_product_weight = round((product_weight * int(qty))/1000, 2)
    delivery_cost = scs.check_delivery_cost(product_weight=total_product_weight,
                                            src_pin_code=560036,
                                            dst_pin_code=dst_pin_code)
    return delivery_cost

def calculate_selling_price(product_selling_price, qty):
    return product_selling_price*int(qty)

def calculate_tax(selling_price):
    return round(selling_price * 0.19, 2)

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
        for cart_item in form_data.get("cart_items", []):
            product_price_info = {}
            product_price_info["product_id"] = cart_item["product_id"]
            product_price_info["product_qty"] = cart_item["product_qty"]
            product_price_info["price_details"] = fetch_complete_price_details(session,product_id=cart_item["product_id"],
                                                                               qty=cart_item["product_qty"],
                                                                               dst_pin_code=dst_pin_code)

            result["product_price_info"].append(product_price_info)
        result["total_selling_price"] = sum(i["price_details"]["selling_price"] for i in result["product_price_info"])
        result["total_tax_price"] = sum(i["price_details"]["tax_price"] for i in result["product_price_info"])
        result["total_shipping_price"] = sum(i["price_details"]["shipping_price"] for i in result["product_price_info"])
        result["total_price"] = sum(i["price_details"]["total_price"] for i in result["product_price_info"])
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
        new_order.order_total_price = form_data["order_price"]["total_price"]
        new_order.order_selling_price = form_data["order_price"]["total_selling_price"]
        new_order.order_shipping_price = form_data["order_price"]["total_shipping_price"]
        new_order.order_tax_price = form_data["order_price"]["total_tax_price"]
        new_order.order_date = str(datetime.datetime.now())
        shipping_address = Address(**form_data["order_shipping_address"])
        print(f"[create_order] Shipping Address Created is : {shipping_address}")
        new_order.order_shipping_address = shipping_address
        print(f"[create_order] Order Created is : {new_order}")
        payment_info = PaymentInfo(orders=new_order,
                                   payment_gateway=form_data["order_payment_info"]["payment_gateway"],
                                   payment_method=form_data["order_payment_info"]["payment_method"],
                                   payment_transaction_id=form_data["order_payment_info"]["payment_transaction_id"])
        print(f"[create_order] PaymentInfo Created is : {payment_info}")
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
        session.add(payment_info)
        session.add(new_order)
        session.commit()

        if order_info := session.query(Orders).filter_by(order_info_id=form_data["order_info_id"]).first():
            print(f"[create_order] The order_info is :: {order_info} ")
            result["order_info"] = order_info.to_dict()
    except Exception as ex:
        print(f"[create_order] Exception while creating an order : {ex}")    
    finally:
        if session:
            session.close()
    return result
