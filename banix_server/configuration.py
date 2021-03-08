import os

PROJECT_BASE_PATH = "/home/arun/codecave/banix/banix_server"
DATABASE_FILE = os.path.join(PROJECT_BASE_PATH, "db", "banix_database.db")

shiprocket_username = "sales@banix.in"
shiprocket_password = "sales@banix"

WEB_SERVER_IP = "0.0.0.0"
WEB_SERVER_PORT = 7701
# turn off in production
# indicates if the debug mode on the web server is to be enabled.
DEBUG_MODE = True
SECRET_KEY = "banix_2021"

MEDIA_SOURCE_PATH = "/home/arun/codecave/banix/media/raw"
MEDIA_PROCESSED_PATH = "/home/arun/codecave/banix/media/processed"
MEDIA_IMAGE_PROXY_PATH = "/home/arun/codecave/banix/media/images"
MEDIA_VIDEO_PROXY_PATH = "/home/arun/codecave/banix/media/videos"
LOG_PATH = "/home/arun/codecave/banix/logs"
