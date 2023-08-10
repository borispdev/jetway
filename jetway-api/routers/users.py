from typing import Annotated
from fastapi import APIRouter, Security
from schemas.users import UserOutAdmin
from services.auth import get_active_user
from services.basefacade import BaseFacade
from services.adminfacade import AdministratorFacade
from schemas.users import UserOut, UserInput

router = APIRouter(tags=['Users'])
base_facade = BaseFacade()
admin_facade = AdministratorFacade()

@router.post('/users/', response_model=UserOut, status_code=201, name='Register new user')
async def create_new_user(new_user: UserInput):
    user = base_facade.create_new_user(new_user)
    return user

@router.get('/users/', response_model=list[UserOutAdmin], name='Get all users')
async def gel_all_users(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])]):
    """ 
    Get list of all customers
    """
    customers = admin_facade.get_all_users()
    return customers
