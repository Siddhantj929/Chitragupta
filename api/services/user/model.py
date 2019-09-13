from ..base_model import BaseModel
from .schema import UserSchema

from ..user_addresses.model import UserAddresses
from ..user_credentials.model import UserCredentials


class Users(BaseModel):
    def __init__(self):
        super().__init__(schema=UserSchema)
        self.__Address = UserAddresses()
        self.__Credentials = UserCredentials()

    def create(self, user: dict,
               credentials: dict, address: dict) -> UserSchema:
        try:
            _credentials = self.__Credentials.create(**credentials)
            _address = self.__Address.create(**address)

            _user = super().create(
                **user, credentials=_credentials, address=_address)

            return _user
        except Exception as e:
            print(e)
            return None
