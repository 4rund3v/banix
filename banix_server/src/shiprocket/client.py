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

    def check_serviceability(self, src_pin_code, dst_pin_code):
        serviceablity = {
        "estimated_delivery_days": -1
        }
        try:
            self.active_session.headers.update({'Content-Type': 'application/json'})
            query_data = json.dumps({"weight": 2, "cod": 0, "pickup_postcode": src_pin_code, "delivery_postcode": dst_pin_code })
            print(f"Data prepared is : {query_data}")
            resp = self.active_session.get(shiprocket_consts.COURIER_SERVICEABILITY_URL, data=query_data)
            print(f"Response Prepared is : {resp}")
            resp.raise_for_status()
            print(f"[ShiprocketClient][check_serviceability] The serviceablity response is :: {resp.json()}")
            resp_data = resp.json()
            recommended_option = resp_data["data"]["available_courier_companies"][0]
            serviceablity["estimated_delivery_days"] =recommended_option["estimated_delivery_days"]
            serviceablity["courier_name"] = recommended_option["courier_name"]
            serviceablity["courier_company_id"] = recommended_option["courier_company_id"]
            serviceablity["rate"] = recommended_option["rate"]
        except Exception as ex:
            print(f"[ShiprocketClient][check_serviceability] Unable to fetch the serviceablity : {ex}")
        return serviceablity