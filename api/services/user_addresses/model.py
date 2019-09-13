from ..base_model import BaseModel
from .schema import UserAddressSchema


class UserAddresses(BaseModel):
    def __init__(self):
        super().__init__(schema=UserAddressSchema)
