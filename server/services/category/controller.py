from flask import request

from config import CURRENT_CONFIG
from api.errors import errors
from api.response import Response
from .schema import CategorySchema as Category
from .model import Categories as CategoryModel
from user.model import Users as UserModel
from user.schema import UserSchema as User
from flask_jwt_extended import jwt_required, get_jwt_identity

Categories = CategoryModel()
Users = UserModel()

# Create new Category
@jwt_required
def create():
    if request.method != 'POST':
        raise errors.WrongRequest()

    category_name = None
    category = None
    user = None
    user_id = get_jwt_identity()

    # Findind user
    try:
        user = Users.find(User.id == user_id)[0]

        if user is None:
            raise Exception(1)

    except Exception as e:

        if e == 1:
            raise errors.WrongDataSent(
                payload={'error': 'No user found'}
                if CURRENT_CONFIG.DEBUG else None)

        raise errors.InternalServerError(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Validating data - incomplete
    try:
        category_name = request.form.get('name')

    except Exception as e:
        raise errors.WrongDataSent(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Creating Category
    try:
        category = Categories.create(category_name)

        category = Categories.update(
            Category.id == category.id, _with={'user': user})[0]

        if category is None:
            raise Exception('The Category was not created successfully.')
    except Exception as e:
        raise errors.InternalServerError(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Generating response
    response = Response(
        f'Category <{category.id}> successfully created.',
        201,
        category.json()
    )

    return response.to_dict(), response.status_code
