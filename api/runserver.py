import database
from app import app
import api

from config import CURRENT_CONFIG

if __name__ == "__main__":
    app.run(port=CURRENT_CONFIG.PORT)
