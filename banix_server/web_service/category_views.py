from flask import Blueprint, request
import os
import sys
import datetime
import math

build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from src.models import Category
from src.db_utils import Session
from src.logger import get_logger

logger = get_logger("web_app")

category_blueprint = Blueprint("categories", __name__)

@category_blueprint.route("/categories")
def fetch_categories() -> dict:
    """
     to fetch the categories
    """
    result = {}
    result["categories"] = []
    session = None
    try:
        session = Session()
        logger.debug(f"[fetch_categories] Requerst to fetch the categories")
        for category in session.query(Category).all():
            logger.debug(f"[fetch_categories] The category info fetched is :: {category}")
            result["categories"].append(category.to_dict())
    except Exception as ex:
        logger.exception(f"[fetch_categories] Exception while fetching the category info : {ex}")
    finally:
        if session:
            session.close()
    logger.debug(f"[fetch_categories] the categories returned are :: {result}")
    return result