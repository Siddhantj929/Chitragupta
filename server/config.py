import os
from dotenv import load_dotenv

# Load environment files
load_dotenv()


class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = os.getenv('DATABASE_URI')
    CLOUDINARY_URL = os.getenv('CLOUDINARY_URL')
    PORT = 5001
    HOST = '0.0.0.0'


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


# The configuration settings currently in effect
CURRENT_CONFIG = DevelopmentConfig()
