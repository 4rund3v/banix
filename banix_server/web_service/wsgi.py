import sys
from app import app
from src.logger import get_logger
logger = get_logger("web_app")

if __name__ == "__main__":
    logger.info("[wsgi][main] The server is started")
    app.run()
