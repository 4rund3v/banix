from flask import request, Blueprint, request
from sqlalchemy import desc

import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.db_utils import Session
from src.models import Orders, OrderPrice, OrderStatus, OrderItem, Address
from src.logger import get_logger

logger = get_logger("web_app")
admin_blueprint = Blueprint("admin", __name__)


@admin_blueprint.route("/admin/latest-transactions")
def get_latest_transactions():
    
    logger.debug(f"[get_latest_transactions] The latest transactions are requested")
    session = None
    result = {}
    result["latest_transactions"] = []
    try:
        logger.debug(f"[get_latest_transactions] The args received is : {request.args}")
        session = Session()
        result["latest_transactions"] = [order.to_dict() for order in session.query(Orders).order_by(desc(Orders.order_created_datetime)).limit(30)]
    except Exception as ex:
        logger.exception(f"[get_latest_transactions] Unable to fetch the latest transactions : {ex}")
        result["err_msg"] = str(ex)
    return result