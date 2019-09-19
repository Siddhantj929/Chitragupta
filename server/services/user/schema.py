# Author: Siddhant Jain
# Edited at: 20/7/209, 14:20

from sqlalchemy import String, DateTime, Column
from sqlalchemy.dialects.postgresql import UUID

from datetime import datetime
from uuid import uuid4

from database import Base
from helpers import Serializable


class UserSchema(Base, Serializable):
    # Meta
    __tablename__ = 'users'

    # Identifiers
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String)

    # Primary Credentials
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    # user image
    image_url = Column(String, nullable=False)

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, name, email, password, image_url):
        self.name = name
        self.email = email
        self.password = password
        self.image_url = image_url

    def json(self) -> dict:
        _result = {
            'user': str(self.id),
            'mail': self.email,
            'img': self.image_url,
            'built': str(self.created_at),
            'modified': str(self.updated_at)
        }

        return _result
