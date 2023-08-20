from os import environ
from datetime import datetime, timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordBearer, SecurityScopes
from schemas.basic import TokenData
from pydantic import ValidationError
from jose import JWTError, jwt
from passlib.context import CryptContext
from sql_app.users import get_user_by_username, get_all_roles
from schemas.users import UserInput

router = APIRouter

def get_secret_key():
    """
    Get db password from password file or env. variable.
    """
    key = ''
    if environ['API_KEY_FILE'] is not None:
        with open(environ['API_KEY_FILE']) as file:
            key = file.read()
    else:
        key = environ['API_KEY']
    return key.strip()

SECRET_KEY = get_secret_key()
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 180

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def get_roles():
    """ Get all user roles from DB """
    roles = get_all_roles()
    return roles


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token",
    scopes=get_roles())


def verify_password(password_str, password_hash):
    """Bcrypt password hash check"""
    return pwd_context.verify(password_str, password_hash)


def get_password_hash(password_str):
    """Password hashing before storing in DB"""
    return pwd_context.hash(password_str)


def authenticate_user(username, password):
    """Check credentials"""
    user = get_user_by_username(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_token(data: dict, expiry_period: timedelta | None = None):
    """JWT token generation"""
    to_encode = data.copy()
    if expiry_period:
        expire = datetime.utcnow() + expiry_period
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(security_scopes: SecurityScopes, token: Annotated[str, Depends(oauth2_scheme)]):
    """Get current user token and check user's role"""
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # Get username from token 'sub' section
        username: str = payload.get('sub')
        if username is None:
            raise credentials_exception
        # Get user role from token 'scopes' section
        token_scopes = payload.get("scopes", [])
        token_data = TokenData(scopes=token_scopes, username=username)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not enough permissions",
            headers={"WWW-Authenticate": authenticate_value},
        )
    user = get_user_by_username(username=token_data.username)
    if user == None:
        raise credentials_exception
    for scope in security_scopes.scopes:  # Check user permission for API endpoint
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user


async def get_active_user(current_user: Annotated[UserInput, Security(get_current_user)]):
    return current_user
