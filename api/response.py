class Response:
    def __init__(self, message, status_code=None, payload=None):
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = {}
        rv['payload'] = dict(self.payload or ())
        rv['message'] = self.message
        return rv
