from logger import logger
from sqlalchemy.orm import Session, joinedload
from schemas.users import UserInput
from .database import SessionLocal, User, UserRole


def add_user(username, password, email):
    with SessionLocal() as db:
        new_user = User(username=username, password=password,
                        email=email, user_role=3)
        db.add(new_user)
        db.commit()
        logger.debug(f'New user {username} added to DB')
    return new_user


def get_user_by_username(username):

    with SessionLocal() as db:
        user = db.query(User).options(joinedload(User.role)).filter(
            User.username == username).first()
        if user is not None:
            return user
        else:
            logger.debug(f'User {username} not found.')


def get_user_by_id(user_id):
    with SessionLocal() as db:
        user = db.query(User).get(user_id)
        logger.debug(f'User ID {user_id} retrieved from DB')

    return user


def get_all_roles():
    with SessionLocal() as db:
        roles = db.query(UserRole).with_entities(
            UserRole.role_name, UserRole.description).all()
    return dict(roles)
