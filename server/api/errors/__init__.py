from ..response import Response


class APIException(Exception, Response):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        Response.__init__(self, message, status_code, payload)
