from helpers import BaseModel
from .schema import CategorySchema


class Categories(BaseModel):
    def __init__(self):
        super().__init__(schema=CategorySchema)
