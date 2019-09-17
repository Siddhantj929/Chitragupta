from flask import request

from config import CURRENT_CONFIG
from api.errors import errors
from api.response import Response
from .model import Users as UserModel

Users = UserModel()


def create_user():
    if request.method != 'POST':
        raise errors.WrongRequest()

    user = None
    user_data = None
    user_address = None
    user_credentials = None

    # Validating data - incomplete
    try:
        user_data = request.get_json()
        user_address = user_data.pop('address')
        user_credentials = user_data.pop('credentials')
    except Exception as e:
        raise errors.WrongDataSent(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    print(user_data)

    # Creating user
    try:
        user = Users.create(
            user=user_data, credentials=user_credentials, address=user_address)

        if user is None:
            raise Exception('The user was not created successfully.')
    except Exception as e:
        raise errors.InternalServerError(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Generating response
    response = Response(
        f'User <{user.id}> successfully created.',
        201,
        user.json()
    )

    return response.to_dict(), response.status_code
