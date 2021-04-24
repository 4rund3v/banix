import os

PROJECT_BASE_PATH = "/home/arun/codecave/banix/banix_server"
DATABASE_FILE = os.path.join(PROJECT_BASE_PATH, "db", "banix_database.db")

shiprocket_username = "sales@banix.in"
shiprocket_password = "sales@banix"
# razor pay 
RAZOR_PAY_KEY = "rzp_test_lKNNKwimAlfTDd"
RAZOR_PAY_TOKEN = "V54lmQ2rf3RlLfc6709rODtp"



CARE_EMAIL_ID = "care@banix.in"
OFFERS_EMAIL_ID = "ads@banix.in"
ORDERS_EMAIL_ID = "orders@banix.in"

WEB_SERVER_IP = "0.0.0.0"
WEB_SERVER_PORT = 7701
# turn off in production
# indicates if the debug mode on the web server is to be enabled.
DEBUG_MODE = True
SECRET_KEY = "banix_2021"

ROOT_PATH = "/home/arun/codecave/banix"
MEDIA_SOURCE_PATH = os.path.join(ROOT_PATH, "media", "raw")
MEDIA_PROCESSED_PATH = os.path.join(ROOT_PATH, "media", "processed")
MEDIA_IMAGE_PROXY_PATH = os.path.join(ROOT_PATH, "media", "images")
MEDIA_VIDEO_PROXY_PATH = os.path.join(ROOT_PATH, "media", "videos")
LOG_PATH = os.path.join(ROOT_PATH, "logs")
