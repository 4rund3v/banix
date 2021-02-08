from configuration import shiprocket_username, shiprocket_password
from src.shiprocket import constants as shiprocket_consts
from requests import session
import json

class ShiprocketClient():
    """
     Client to handle the communication with the shiprocket apis.
    """
    def __init__(self):
        self.active_session = None
        self._authorization_post_data = json.dumps({
        "email": shiprocket_username,
        "password": shiprocket_password
        })
        pass

    def connect(self):
        try:
            _session = session()
            _session.headers.update({'Content-Type': 'application/json'})
            resp = _session.post(shiprocket_consts.AUTHENTICATION_API,
                                 data=self._authorization_post_data)
            resp.raise_for_status()
            resp_data = resp.json()
            _session.headers.update({shiprocket_consts.AUTHENTICATION_HEADER_NAME: "{} {}".format(shiprocket_consts.AUTHENTICATION_TOKEN_PREFIX, resp_data["token"]) })
            print(f"[ShiprocketClient][connect] Active Session Headers :: {_session.headers}")
            self.active_session = _session
            return True
        except Exception as ex:
            print(f"[ShiprocketClient][connect] Unable to connect to the shiprocket client : {ex}")
        return False
