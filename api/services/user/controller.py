from flask import request

from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

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
    user_credentials = None
    user_image = None

    # Validating data - incomplete
    try:
        user_data = request.get_json()
        user_credentials = user_data.pop('credentials')
        user_image = request.files['image']
    except Exception as e:
        raise errors.WrongDataSent(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    print(user_data)

    # Storing image in cloud
    try:
        upload_data = upload(user_image)

        thumbnail_url2, options = cloudinary_url(
            upload_data['public_id'],
            format="jpg",
            crop="fill",
            width=200,
            height=200,
            radius=20)

        user_credentials['image_url'] = thumbnail_url2
    except Exception as e:
        raise errors.InternalServerError(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Creating user
    try:
        user = Users.create(
            user=user_data, credentials=user_credentials)

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
