import logging
import datetime
import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)
from configuration import LOG_PATH

MODULE_MAPPING = {
    "email": "email_service.log",
    "shipping": "shipping_tracker.log",
    "payment": "payment_tracker.log",
    "proxy": "proxy.log",
    "web_app": "web-app.log",
    "default": "default.log"
}

initialized_modules = {}

def get_logger(module="default"):
    """
     get the logger object given the module name
    """
    if module in initialized_modules:
        return initialized_modules[module]
    if module in MODULE_MAPPING:
        filename = MODULE_MAPPING[module]
    else:
        filename = MODULE_MAPPING["default"]
    logging.basicConfig(level=logging.DEBUG,
                        format='%(asctime)s %(name)-12s %(levelname)-8s %(message)s',
                        datefmt='%m-%d %H:%M',
                        filename=os.path.join(os.path.join(LOG_PATH, filename)),
                        filemode='w')
    logger = logging.getLogger(module)
    initialized_modules[module] = initialized_modules
    return logger

