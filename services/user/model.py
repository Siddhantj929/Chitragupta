from helpers import BaseModel
from .schema import UserSchema


class Users(BaseModel):
    def __init__(self):
        super().__init__(schema=UserSchema)
