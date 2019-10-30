# Author: Siddhant Jain

from sqlalchemy import DateTime, Column, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from datetime import datetime
from uuid import uuid4

from database import Base
from helpers import Serializable


class NoteSchema(Base, Serializable):
    # Meta
    __tablename__ = 'notes'

    # Identifiers
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)

    # Data
    data = Column(Text)

    # Category
    catgeory_id = Column(UUID(as_uuid=True), ForeignKey('categories.id'))
    category = relationship(
        'CategorySchema', back_populates="notes", lazy="joined")

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, data):
        self.data = data

    def json(self) -> dict:
        _result = {
            'note': str(self.id),
            'says': self.data,
            'built': str(self.created_at),
            'modified': str(self.updated_at)
        }

        return _result
