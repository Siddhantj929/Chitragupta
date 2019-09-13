from ..base_controller import BaseController
from .model import UserAddress


class UserAddressController(BaseController):
    def __init__(self):
        super().__init__(model=UserAddress)
