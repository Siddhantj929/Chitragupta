class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'postgres://root:root@localhost:5432/hoopoun_users'


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


# The configuration settings currently in effect
CURRENT_CONFIG = DevelopmentConfig()
