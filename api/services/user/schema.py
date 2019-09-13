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
    __serialize_key__ = 'hpn_users'

    # Identifiers
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String)
    username = Column(String)

    # Credentials for login and contact
    credentials = relationship(
        'UserCredentialsSchema', uselist=False, back_populates="user")

    # Address information
    address = relationship('UserAddressSchema',
                           uselist=False, back_populates="user")

    # Location identifier
    longitude = Column(String)
    latitude = Column(String)

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, name, username, longitude, latitude, address, credentials):
        self.name = name
        self.username = username
        self.longitude = longitude
        self.latitude = latitude
        self.address = address
        self.credentials = credentials

    def json(self) -> dict:
        _result = {
            'user': str(self.id),
            'mail': self.credentials.email,
            'contact': f'{self.credentials.country_code} ' +
            f'{self.credentials.phone_number}',
            'location': f'{self.address.city}, {self.address.state}, ' +
                        f'{self.address.country}',
            'built': str(self.created_at),
            'modified': str(self.updated_at)
        }

        return _result
