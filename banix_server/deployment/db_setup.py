import os
import sys

if os.name == "posix":
    BUILD_PATH = "/opt/banix"
else:
    BUILD_PATH = "C:\\Projects\\banix\\banix_server"

sys.path.append(BUILD_PATH)
from commons.db_models import *
from commons.utils import *

Base.metadata.create_all(engine)