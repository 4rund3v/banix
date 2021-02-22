# The payment, price related functions
import math
from src.shiprocket import shiprocket_client_session as scs
from src.models import Product, ProductSpecification



def fetch_complete_price_details(session, product_id, qty, dst_pin_code):
    """
     Given the product id, dst_pin_code the complete price details is calculated
    """
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

def get_total_price(shipping_price: int, tax_price: int, selling_price: int) -> int:
    return math.ceil(shipping_price+tax_price+selling_price)

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