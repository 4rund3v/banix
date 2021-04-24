from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from configuration import WEB_SERVER_IP, WEB_SERVER_PORT, DEBUG_MODE, SECRET_KEY, DATABASE_FILE
# User perspective blueprints
from product_views import product_blueprint
from customer_views import customer_blueprint
from auth_views import auth_blueprint
from order_views import order_blueprint
from category_views import category_blueprint
# Admin Perspective Blueprints
from admin_views import admin_blueprint
# others
from src.logger import get_logger
logger = get_logger("web_app")

# db = SQLAlchemy()

if __name__ == "__main__":
    app = Flask(__name__)
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///{}'.format(DATABASE_FILE)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)
    # logger.debug(f"[app][main] Initializing the db : {db}")
    # db.init_app(app)
    logger.debug("[app][main] registering the blueprints ")
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(customer_blueprint)
    app.register_blueprint(product_blueprint)
    app.register_blueprint(category_blueprint)
    app.register_blueprint(order_blueprint)
    app.register_blueprint(admin_blueprint)
    print(f"[app][main] Running the app on the ip:{WEB_SERVER_IP} port:{WEB_SERVER_PORT}")
    app.run(host=WEB_SERVER_IP, port=WEB_SERVER_PORT, debug=DEBUG_MODE)
