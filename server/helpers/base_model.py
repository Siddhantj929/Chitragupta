from database import session_factory
from .singleton import Singleton


class BaseModel(metaclass=Singleton):
    def __init__(self, schema):
        self.__schema__ = schema
        self.session = session_factory()

    def create(self, *args, **kwargs):
        try:
            new_object = self.__schema__(*args, **kwargs)

            self.session.add(new_object)

            self.session.commit()
            return new_object
        except Exception as e:
            print(e)
            return None

    def find(self, *args, **kwargs):
        try:
            query = self.session.query(self.__schema__)\
                .filter(*args, **kwargs)

            objects = query.all()

            return objects
        except Exception as e:
            print(e)
            return None

    def update(self, _with: dict, *args, **kwargs):
        try:
            objects = self.session.query(self.__schema__)\
                .filter(*args, **kwargs).all()

            for item in objects:
                for (key, value) in _with:
                    item.__dict__[key] = value

            self.session.commit()
            return objects
        except Exception as e:
            print(e)
            return None

    def delete(self, *args, **kwargs):
        try:
            query = self.__schema__.__table__.delete().where(*args, **kwargs)

            self.session.execute(query)

            self.session.commit()
            return True
        except Exception as e:
            print(e)
            return False

    def __del__(self):
        self.session.close()
