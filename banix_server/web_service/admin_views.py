from flask import request, Blueprint, request
from src.logger import get_logger

logger = get_logger("web_app")
admin_blueprint = Blueprint("admin", __name__)
