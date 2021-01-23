from flask import Flask, jsonify, abort
import json
import os

PRODUCTS_STORE = os.path.join(os.getcwd(), "products", "products.json")

app = Flask(__name__)

@app.route("/api/products")
def fetch_products():
    """
     To fetch the products and return to the ui
    """
    with open(PRODUCTS_STORE, "r") as rfile:
        product_details = json.load(rfile)
    return {"products": product_details["products"]}



@app.route("/api/products/<product_id>")
def fetch_specific_product(product_id):
    """
     To fetch the products and return to the ui
    """
    product_details = product = {}
    with open(PRODUCTS_STORE, "r") as rfile:
        product_details = json.load(rfile)
    for p in product_details["products"]:
        if p["_id"] == product_id:
            product = p
            break
    return {"product": product}




if __name__ == "__main__":
    app.run(host="localhost", port=3300, debug=True)
