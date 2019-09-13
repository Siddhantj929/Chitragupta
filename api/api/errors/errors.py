from . import APIException


class UserNotFound(APIException):
    def __init__(self, user_id, payload=None):
        super().__init__(
            f'Sorry, user <{user_id}> was not found in records.',
            404,
            payload
        )


class WrongRequest(APIException):
    def __init__(self, payload=None):
        super().__init__(
            'This route is not open for this request',
            405,
            payload
        )


class WrongDataSent(APIException):
    def __init__(self, payload=None):
        super().__init__(
            'Wrong data sent. Please try with correct data.',
            400,
            payload
        )


class InternalServerError(APIException):
    def __init__(self, payload=None):
        super().__init__(
            'Sorry, we are facing some issues right now. Try again later.',
            500,
            payload
        )
