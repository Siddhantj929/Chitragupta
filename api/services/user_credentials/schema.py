# Author: Siddhant Jain
# Edited at: 20/7/209, 14:20


from sqlalchemy import String, DateTime, \
    Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.orm import relationship

from uuid import uuid4

from datetime import datetime

from database import Base


class UserCredentialsSchema(Base):
    __tablename__ = 'users_credentials'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)

    # User Identifier
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    user = relationship(
        'UserSchema', back_populates="credentials", lazy="joined")

    # Primary Credentials
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    country_code = Column(String, nullable=False)

    # Alternate Credentials
    alternate_email = Column(String, unique=True)
    alternate_phone_number = Column(String)
    alternate_country_code = Column(String)

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, email, password, country_code, phone_number,
                 alt_phone=None, alt_email=None, alt_code=None):

        self.email = email
        self.password = password
        self.phone_number = phone_number
        self.country_code = country_code
        self.alternate_phone_number = alt_phone
        self.alternate_email = alt_email
        self.alternate_country_code = alt_code
