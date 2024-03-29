import os
import sys
build_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(build_path)

from src.models import Base
from src.db_utils import session, engine

from products.create_products import create_default_products, create_product_reviews, create_default_categories

print("[db_setup] Creating the databases if not existing.")
Base.metadata.create_all(engine)
print("[db_setup] Adding the default categories.")
create_default_categories()
print("[db_setup] Adding the default products.")
create_default_products()
print("[db_setup] Adding the default reviews.")
create_product_reviews()
