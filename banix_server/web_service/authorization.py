from flask import Flask, request, jsonify, make_response
from  werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from functools import wraps
# imports for PyJWT authentication
import jwt
from commons.db_models import User
from commons.utils import Session, engine
import re

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        session = None
        # jwt is passed in the request header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        token = re.sub("^(Bearer )", "", token)
        print(f"token recieved is ::: {token}")
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
        print("Decoding the token !! {}".format(token))
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, "banix")
            print(f"The data decoded is ::: {data}")
            session = Session()
            current_user =  session.query(User).filter_by(public_id = data['public_id']).first()
        except Exception as ex:
            print(f"Error decoding the data ::: {ex}")
            return jsonify({ 'message' : 'Token is invalid !!' }), 401
        finally:
            if session:
                session.close()
        # returns the current logged in users contex to the routes
        return  f(current_user.as_dict(), *args, **kwargs)
    return decorated
