from app import app
from .controller import user_controller as uc

BASE_PREFIX = '/api/v1'


class Route:
    def __init__(self, route, name, controller, method):
        self.route = route
        self.name = name
        self.controller = controller
        self.methods = [method, ]


USER_ROUTES = [
    Route('/user', 'create_user', uc.create, 'POST')
]

ROUTES = [*USER_ROUTES]

for r in ROUTES:
    app.add_url_rule(f'{BASE_PREFIX}{r.route}',
                     r.name, r.controller, methods=r.methods)
