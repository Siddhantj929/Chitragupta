from flask import request

from config import CURRENT_CONFIG
from api.errors import errors
from api.response import Response
from .model import Users as UserModel
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

Users = UserModel()


def create_user():
    if request.method != 'POST':
        raise errors.WrongRequest()

    user = None
    user_data = None
    user_image = None

    # Validating data - incomplete
    try:
        user_data = dict(request.form)
        user_image = request.files['user_image']
    except Exception as e:
        raise errors.WrongDataSent(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Uploading image
    try:
        response = upload(
            user_image, public_image=user_data['name'].replace(' ', '_'))

        url, options = cloudinary_url(
            response['public_id'],
            format=response['format'],
            width=500,
            height=500,
            crop="fill"
        )

        user_data['image_url'] = url
    except Exception as e:
        raise errors.InternalServerError(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Creating user
    try:
        user = Users.create(**user_data)
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
