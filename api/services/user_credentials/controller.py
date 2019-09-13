from ..base_controller import BaseController
from .model import UserCredentials


class UserCredentialsController(BaseController):
    def __init__(self):
        super().__init__(model=UserCredentials)
