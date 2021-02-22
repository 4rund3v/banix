from flask import Flask, request, jsonify, make_response
from  werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from functools import wraps
# imports for PyJWT authentication
import jwt
from src.models import Customer
from src.db_utils import Session, engine
import re

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
        print(f"[token_required] token recieved is ::: {token}")
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
        print("[token_required] Decoding the token !! {}".format(token))
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, "banix")
            print(f"The data[public_id] decoded is ::: {data['public_id']}")
            session = Session()
            current_customer =  session.query(Customer).filter_by(public_id = data['public_id']).first()
            current_customer_info = current_customer.to_dict()
        except Exception as ex:
            print(f"[token_required] Error decoding the data ::: {ex}")
            return jsonify({ 'message' : 'Token is invalid !!' }), 401
        finally:
            if session:
                session.close()
        # returns the current logged in customers contex to the routes
        return f(current_customer_info, *args, **kwargs)
    return decorated
