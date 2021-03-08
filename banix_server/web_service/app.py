from flask import Flask
from flask_cors import CORS
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from configuration import WEB_SERVER_IP, WEB_SERVER_PORT, DEBUG_MODE, SECRET_KEY
# Importing blueprints
from product_views import product_blueprint
from customer_views import customer_blueprint
from auth_views import auth_blueprint
from order_views import order_blueprint
from src.logger import get_logger

logger = get_logger("web_app")

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
CORS(app)
app.register_blueprint(auth_blueprint)
app.register_blueprint(customer_blueprint)
app.register_blueprint(product_blueprint)
app.register_blueprint(order_blueprint)

if __name__ == "__main__":
    app.run(host=WEB_SERVER_IP, port=WEB_SERVER_PORT, debug=DEBUG_MODE)
