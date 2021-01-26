from flask import Flask, jsonify, abort
from product_views import product_blueprint
import json
import os

app = Flask(__name__)
app.register_blueprint(product_blueprint)


if __name__ == "__main__":
    app.run(host="localhost", port=3300, debug=True)
