from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from config import CURRENT_CONFIG

engine = create_engine(CURRENT_CONFIG.DATABASE_URI)

# use session_factory() to get a new Session

_SessionFactory = sessionmaker(bind=engine)

Base = declarative_base()

_session = None


def session_factory():
    global _session

    if not _session:
        Base.metadata.create_all(engine)
        _session = _SessionFactory()

    return _session
