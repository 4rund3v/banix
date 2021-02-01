import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)

from commons.db_models import Base
from commons.utils import session, engine

from products.create_products import create_default_products
from users.create_users import create_default_users

print("Creating the databases if not existing.")
Base.metadata.create_all(engine)
print("Adding the default products.")
create_default_products()
create_default_users()
