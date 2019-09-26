# Author: Siddhant Jain
# Edited at: 20/7/209, 14:20

from sqlalchemy import String, DateTime, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from datetime import datetime
from uuid import uuid4

from database import Base
from helpers import Serializable


class ProjectSchema(Base, Serializable):
    # Meta
    __tablename__ = 'projects'

    # Identifiers
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(String)

    # Owner
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    user = relationship('UserSchema', back_populates="projects", lazy="joined")

    # Campaigns
    campaigns = relationship(
        'CampaignSchema', uselist=True, back_populates="project")

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, name):
        self.name = name

    def json(self) -> dict:
        _result = {
            'project': str(self.id),
            'called': self.name,
            'built': str(self.created_at),
            'modified': str(self.updated_at)
        }

        return _result
