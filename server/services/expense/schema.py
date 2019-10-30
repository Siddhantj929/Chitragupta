# Author: Siddhant Jain
# Edited at: 20/7/209, 14:20

from sqlalchemy import Text, DateTime, Column, ForeignKey, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from datetime import datetime
from uuid import uuid4

from database import Base
from helpers import Serializable


class ExpenseSchema(Base, Serializable):
    # Meta
    __tablename__ = 'expenses'

    # Identifiers
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)

    # Owner
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    user = relationship(
        'UserSchema', back_populates="expenses", lazy="joined")

    # data
    amount = Column(Float, required=True)
    reason = Column(Text, required=True)

    # Tracks
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)

    def __init__(self, amount, reason):
        self.amount = amount
        self.reason = reason

    def json(self) -> dict:
        _result = {
            'expense': str(self.id),
            'of': self.amount,
            'due_to': self.reason,
            'built': str(self.created_at),
            'modified': str(self.updated_at)
        }

        return _result
