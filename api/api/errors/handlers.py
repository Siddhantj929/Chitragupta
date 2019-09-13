from flask import jsonify

from app import app
from . import APIException

# Custom handlers should come before default handler

# Default handler for all errors
@app.errorhandler(APIException)
def default_error_handler(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
