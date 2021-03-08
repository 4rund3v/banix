from flask import Flask, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from functools import wraps
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from configuration import SECRET_KEY
# imports for PyJWT authentication
import jwt
import re
from src.models import Customer
from src.db_utils import Session

from src.logger import get_logger
logger = get_logger("web_app")


def token_required(f):
    """
     This function evaluates the request to have the Authorization token header in the request header
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        session = None
        # jwt is passed in the request header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        token = re.sub("^(Bearer )", "", token)
        logger.debug(f"[token_required] token received is ::: {token}")
        # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401
        logger.debug(f"[token_required] Decoding the token !! {token}")
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, SECRET_KEY)
            logger.debug(f"The data[public_id] decoded is ::: {data['public_id']}")
            session = Session()
            current_customer = session.query(Customer).filter_by(public_id=data['public_id']).first()
            current_customer_info = current_customer.to_dict()
        except Exception as ex:
            logger.exception(f"[token_required] Error decoding the data ::: {ex}")
            return jsonify({'message': 'Token is invalid !!'}), 401
        finally:
            if session:
                session.close()
        # returns the current logged in customers context to the routes
        return f(current_customer_info, *args, **kwargs)

    return decorated
