# Author: Siddhant Jain
# Edited at: 20/7/209, 14:20

from sqlalchemy import String, DateTime, Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from datetime import datetime
from uuid import uuid4

from database import Base
from ..serializer import Serializable


class UserSchema(Base, Serializable):
    # Meta
    __tablename__ = 'users'

    # Identifiers
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String)
    username = Column(String)

    # Credentials for login and contact
    credentials = relationship(
        'UserCredentialsSchema', uselist=False, back_populates="user")

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, name, username, credentials):
        self.name = name
        self.username = username
        self.credentials = credentials

    def json(self) -> dict:
        _result = {
            'user': str(self.id),
            'mail': self.credentials.email,
            'img': self.credentials.image_url,
            'built': str(self.created_at),
            'modified': str(self.updated_at)
        }

        return _result
