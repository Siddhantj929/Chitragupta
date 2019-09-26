from flask import Flask
from flask_jwt_extended import JWTManager
from flask.ext.bcrypt import Bcrypt

from config import CURRENT_CONFIG

app = Flask(__name__)

# Configuring the app using the configurations
# specified in config.py
app.config.from_object(CURRENT_CONFIG)

# Creating a JWT manager
jwt = JWTManager(app)

# Initialising Bcrypt
bcrypt = Bcrypt(app)
