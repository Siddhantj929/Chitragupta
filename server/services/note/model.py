from helpers import BaseModel
from .schema import NoteSchema


class Notes(BaseModel):
    def __init__(self):
        super().__init__(schema=NoteSchema)
