from src.shiprocket.client import ShiprocketClient

shiprocket_client_session = None
if not shiprocket_client_session:
    shiprocket_client_session = ShiprocketClient()
    shiprocket_client_session.connect()
