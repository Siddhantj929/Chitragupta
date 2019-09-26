from flask import request

from config import CURRENT_CONFIG
from api.errors import errors
from api.response import Response
from app import bcrypt
from .schema import UserSchema as User
from .model import Users as UserModel
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)

Users = UserModel()


# Sign Up new user
def signup():
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


# Login the user and send access token
def login():
    if request.method != 'POST':
        raise errors.WrongRequest()

    user = None
    user_data = None

    # Getting user's data
    try:
        user_data = dict(request.form)
    except Exception as e:
        raise errors.WrongDataSent(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Finding the user
    try:
        user = Users.find(User.email == user_data['mail'])[0]

        if user is None:
            raise Exception('The user was not created successfully.')
    except Exception as e:
        raise errors.InternalServerError(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Authenticating the user
    try:
        authenticated = bcrypt.check_password_hash(
            user.password,
            user_data['secret']
        )

        if not authenticated:
            raise Exception('No such user was found in the database.')
    except Exception as e:
        raise errors.WrongDataSent(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # If here, the user is authenticated
    # Creating access_token
    access_token = create_access_token(identity=user.id)

    # Generating response
    response = Response(
        f'User successfully authenticated.',
        200,
        {'access_token': access_token}
    )

    return response.to_dict(), response.status_code


# get user data
@jwt_required
def get_user():
    if request.method != 'GET':
        raise errors.WrongRequest()

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
                payload={'error': 'No user found'} if CURRENT_CONFIG.DEBUG else None)
        raise errors.InternalServerError(
            payload={'error': str(e)} if CURRENT_CONFIG.DEBUG else None)

    # Generating response
    response = Response(
        f'User successfully fecthed.',
        200,
        user.json()
    )

    return response.to_dict(), response.status_code
