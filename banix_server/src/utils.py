import datetime
from src.constants import TIMESTAMP_FORMAT

def json_friendly(obj):
    if not obj or type(obj) in (int, float, str):
        return obj
    if type(obj) == datetime.datetime:
        return obj.strftime("%Y-%m-%d %H:%M:%S")
    if type(obj) == dict:
        for k in obj:
            obj[k] = json_friendly(obj[k])
        return obj
    if type(obj) == list:
        for i, v in enumerate(obj):
            obj[i] = json_friendly(v)
        return obj
    if type(obj) == tuple:
        temp = []
        for v in obj:
            temp.append(json_friendly(v))
        return tuple(temp)
    return str(obj)