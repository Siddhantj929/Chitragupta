from ..base_model import BaseModel
from .schema import UserSchema

from ..user_credentials.model import UserCredentials


class Users(BaseModel):
    def __init__(self):
        super().__init__(schema=UserSchema)
        self.__Credentials = UserCredentials()

    def create(self, user: dict, credentials: dict) -> UserSchema:
        try:
            _credentials = self.__Credentials.create(**credentials)

            _user = super().create(**user, credentials=_credentials)

            return _user
        except Exception as e:
            print(e)
            return None
