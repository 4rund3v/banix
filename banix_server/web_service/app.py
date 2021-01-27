from flask import Flask, jsonify, abort
from product_views import product_blueprint
from user_views import user_blueprint
import json
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)


app = Flask(__name__)
app.register_blueprint(product_blueprint)
app.register_blueprint(user_blueprint)


if __name__ == "__main__":
    app.run(host="localhost", port=3300, debug=True)
