from flask import Flask, jsonify, abort
from flask_cors import CORS
import json
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)

# Importing blueprints
from product_views import product_blueprint
from user_views import user_blueprint
from auth_views import auth_blueprint


app = Flask(__name__)
app.config['SECRET_KEY'] = 'banix'
CORS(app)
app.register_blueprint(product_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(auth_blueprint)


if __name__ == "__main__":
    app.run(host="localhost", port=3300, debug=True)
