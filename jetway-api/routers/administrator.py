from typing import Annotated
from fastapi import APIRouter, Security, status
from services.adminfacade import AdministratorFacade
from schemas.admins import AdminIn, AdminOut
from schemas.users import UserInput
from services.auth import get_active_user


router = APIRouter(tags=['Admin'])
admin_facade = AdministratorFacade()

@router.get('/admin/', response_model=list[AdminOut], name='Get all administrators')
async def get_all_administrators(current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])]):
    """
    Create new admin account from existing user
    """
    admins = admin_facade.get_all_administrators()
    return admins

@router.post('/admin/', status_code=status.HTTP_201_CREATED, response_model=AdminOut, name='Add administrator')
async def add_administrator(
        current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])],
        admin: AdminIn):
    """
    Create new admin account from existing user
    """
    admin = admin_facade.add_administrator(admin)
    return admin


@router.delete('/admin/{admin_id}', status_code=status.HTTP_204_NO_CONTENT, name='Delete administrator')
async def delete_administrator(
    current_user: Annotated[UserInput, Security(get_active_user, scopes=['admin'])],
    admin_id
):
    """ 
    Delete admin user 
    """
    admin_facade.remove_administrator(admin_id)
    return admin_id 