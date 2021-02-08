from flask import Flask, jsonify , abort, Blueprint, request
import os
import sys
import uuid
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from commons.db_models import User
from commons.utils import Session, engine
from authorization import token_required
from src.shiprocket import shiprocket_client_session as scs

order_blueprint = Blueprint("orders", __name__)


@order_blueprint.route("/api/serviceablity", methods=["GET"])
@order_blueprint.route("/serviceablity", methods=["GET"])
def check_courier_seriviceablity():
    dst_pin_code = request.args.get('pin_code')
    serviceablity = scs.check_serviceability(src_pin_code=560036, dst_pin_code=dst_pin_code)
    return serviceablity
