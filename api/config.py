class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'postgres://root:root@postgres:5432/chitragupta'
    CLOUDINARY_URL = 'cloudinary://763178253422861:C7szgib9WnpzZ-pnThzXpW4XF6A@dgbpon26i'


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


# The configuration settings currently in effect
CURRENT_CONFIG = DevelopmentConfig()
