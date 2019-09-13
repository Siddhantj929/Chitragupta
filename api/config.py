class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'postgres://root:root@postgres:5432/chitragupta'


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


# The configuration settings currently in effect
CURRENT_CONFIG = DevelopmentConfig()
