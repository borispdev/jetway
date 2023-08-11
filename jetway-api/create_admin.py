import sys
import re
from getpass import getpass
from schemas.users import UserInput
from schemas.admins import AdminIn
from services.basefacade import BaseFacade
from services.adminfacade import AdministratorFacade

def create_admin():
    
    admin_user = {'username': '', 'password': '', 'email': '', 'first_name': '', 'last_nme': ''}
    email_regex = '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'

    admin_user['username'] = input('Enter username: ').strip()
    admin_user['password'] = getpass('Enter password: ').strip()
    password2 = getpass('Confirm password: ').strip()
    admin_user['email'] = input('Enter email: ').strip()
    admin_user['first_name'] = input('Enter first name: ').strip()
    admin_user['last_nme'] = input('Enter last name: ').strip()

    for value in admin_user.values():
        if value == '':
            sys.exit('All fields are required and cannot be empty.')
    
    if admin_user['password'] != password2:
        sys.exit('Passwords do not match.')

    if re.match(email_regex, admin_user['email']) == False:
        sys.exit('Please use valid email.')

    new_user = UserInput(username=admin_user['username'], password=admin_user['password'], email=admin_user['email'])
    base_service = BaseFacade()
    user = base_service.create_new_user(new_user)

    if user is not None:
        new_admin = AdminIn(first_name=admin_user['first_name'],last_name=admin_user['last_nme'], user_id=user.id)
        admin_service = AdministratorFacade()
        admin_service.add_administrator(new_admin)
        sys.exit('New admin created, you can now login.')

if __name__ == '__main__':
    create_admin()