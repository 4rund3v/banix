Perform below steps for server side configuration:

1. Create an virtual environment
  cd banix/banix_server
  pip3 install virtualenv
  # Create a virtual environment folder
  python3 -m venv .venv
  # Activate the environment
  source .venv/bin/activate

2. Install required packages
  cd banix/banix_server
  pip3 install -r requirements.txt


3. Update the project base path in configuration
   cd banix/banix_server
   vim configuration.py
   PROJECT_BASE_PATH="the path to the banix server path"

4. Add the default tables & default products
   cd banix/banix_server/deployment
   export PYTHONPATH=$PYTHONPATH:/home/arun/banix/banix_server
   python db_setup.py
