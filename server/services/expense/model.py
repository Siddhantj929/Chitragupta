from helpers import BaseModel
from .schema import ExpenseSchema


class Expenses(BaseModel):
    def __init__(self):
        super().__init__(schema=ExpenseSchema)
