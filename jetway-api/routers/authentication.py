from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from schemas.users import Token
from services.auth import authenticate_user, create_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(tags=['Authentication'])

@router.post('/token', response_model=Token, name='User authentication')
async def login_for_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # login: LoginIn
    """ 
    Authenticate user and return JWT token
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token_expires = timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES)  # Set token expiry time
    access_token = create_token(
        data={'sub': user.username, 'scopes': user.role.role_name, 'user_id': user.id},
        # data={'sub': user.username, 'scopes': form_data.scopes},
        expiry_period=access_token_expires
    )
    return {'access_token': access_token, 'token_type': 'bearer'}
