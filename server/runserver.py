import api
from app import app
import database

from config import CURRENT_CONFIG


if __name__ == "__main__":
    app.run(port=CURRENT_CONFIG.PORT, host=CURRENT_CONFIG.HOST)
