from schemas.users import UserInput
from sql_app.users import add_user
from .basefacade import BaseFacade
from .auth import get_password_hash


class AnonymousFacade(BaseFacade):

    def register(self, user: UserInput, db):
        pwd_hash = get_password_hash(user.password)
        user.password = pwd_hash
        return add_user(user, db)
