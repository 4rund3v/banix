from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from configuration import DATABASE_FILE
import os
import sys
# custom module imports
from src.models import Base

if not os.path.exists(os.path.dirname(DATABASE_FILE)):
    print(f"[initialize_database] Creating the database dir : {os.path.dirname(DATABASE_FILE)}")
    os.makedirs(os.path.dirname(DATABASE_FILE))

engine = create_engine('sqlite:///{}'.format(DATABASE_FILE), echo=True)
Session = sessionmaker(bind=engine)
session = Session()
Base.metadata.create_all(engine)
