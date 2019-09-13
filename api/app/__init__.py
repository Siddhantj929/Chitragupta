from flask import Flask

from config import CURRENT_CONFIG

app = Flask(__name__)

# Configuring the app using the configurations
# specified in config.py
app.config.from_object(CURRENT_CONFIG)
