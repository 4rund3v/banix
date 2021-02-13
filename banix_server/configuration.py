import os
PROJECT_BASE_PATH = "/opt/banix/banix_server"
DATABASE_FILE = os.path.join(PROJECT_BASE_PATH, "db", "banix_database.db")

shiprocket_username="sales@banix.in"
shiprocket_password="sales@banix"


WEB_SERVER_IP="192.168.1.42"
WEB_SERVER_PORT=3300
# turn off in production
# indicates if the debug mode on the web server is to be enabled.
DEBUG_MODE=True

MEDIA_SOURCE_PATH = "/home/administrator/media/raw"
MEDIA_PROCESSED_PATH = "/home/administrator/media/processed"
MEDIA_IMAGE_PROXY_PATH = "/home/administrator/media/images"
MEDIA_VIDEO_PROXY_PATH = "/home/administrator/media/videos"
