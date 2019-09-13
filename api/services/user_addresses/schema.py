# Author: Siddhant Jain
# Edited at: 20/7/209, 14:20

from sqlalchemy import String, DateTime, \
    Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from uuid import uuid4

from sqlalchemy.orm import relationship

from datetime import datetime

from database import Base


class UserAddressSchema(Base):
    __tablename__ = "users_addresses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)

    # User Identifiers
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    user = relationship('UserSchema', back_populates="address", lazy="joined")

    # Address Details
    house = Column(String, nullable=False)
    street = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, house, street, city, state, country):
        self.house = house
        self.street = street
        self.city = city
        self.state = state
        self.country = country
