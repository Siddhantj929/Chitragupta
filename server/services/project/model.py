from helpers import BaseModel
from .schema import ProjectSchema


class Projects(BaseModel):
    def __init__(self):
        super().__init__(schema=ProjectSchema)
