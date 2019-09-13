from ..base_model import BaseModel
from .schema import UserCredentialsSchema


class UserCredentials(BaseModel):
    def __init__(self):
        super().__init__(schema=UserCredentialsSchema)
