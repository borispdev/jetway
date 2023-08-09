from logger import logger
from schemas.customer import CustomerIn, CustomerOut
from schemas.airline import AirlineInput, AirlineOut
from schemas.admins import AdminIn, AdminOut
from schemas.users import UserOutAdmin
from utils.exceptions import APIException
from sql_app import admin, users, airlines, customers, countries
from sql_app.admin import get_administrators
from .basefacade import BaseFacade
from .validators import check_user_not_exists


class AdministratorFacade(BaseFacade):

    def get_all_administrators(self):
        admins_db = get_administrators()
        admins_list = []
        for admin in admins_db:
            temp_admin = AdminOut(id=admin.id, user_id=admin.user_id, username=admin.user.username, 
                                  first_name=admin.first_name, last_name=admin.last_name)
            admins_list.append(temp_admin)
        return admins_list
    
    def get_all_users(self):
        users_db = admin.get_all_users()
        users_list = []
        for user in users_db:
            if user.role.role_name is None:
                user.role.role_name = 'unasigned'
            tmp_user = UserOutAdmin(id=user.id, username=user.username, email=user.email, role_name=user.role.role_name)
            users_list.append(tmp_user)
        return users_list

    
    def get_all_customers(self):
        customers = admin.get_all_customers()
        customers_list = []
        for customer in customers:
            tmp_customer = CustomerOut(id=customer.id, user_id=customer.user_id, username=customer.user.username, 
                                       first_name=customer.first_name, last_name=customer.last_name, address=customer.address, 
                                       phone_no=customer.phone_no, credit_card=customer.credit_card)
            customers_list.append(tmp_customer)
        return customers_list

    def add_customer(self, customer: CustomerIn):
        """ Add new customer and associate it with existing user """
        self.admin_delete_if_exists(customer.user_id)
        self.airline_delete_if_exists(customer.user_id)
        customer_db = customers.get_customer_by_user_id(customer.user_id)
        if customer_db is not None:
            logger.warning(
                f'Customer with user ID: {customer.user_id} already exists')
            customers.update_customer(customer)
        else:
            if users.get_user_by_id(customer.user_id) is None:
                raise APIException(
                    status_code=400, detail=f'User ID: {customer.user_id} not found')
            new_customer = admin.add_customer(customer)
            admin.update_role(new_customer.user_id, 3)
        return new_customer

    def remove_customer(self, customer_id):
        """ Delete customer and associated user """
        if customers.get_customer_by_id(customer_id) is None:
            logger.warning(f'Customer {customer_id} not found')
            raise APIException(
                status_code=400, detail='Customer not found, nothing to delete.')
        customer = admin.delete_customer(customer_id)
        return customer

    def add_airline(self, airline: AirlineInput):
        """ Add new airline and associate it with existing user """
        self.admin_delete_if_exists(airline.user_id)
        self.customer_delete_if_exists(airline.user_id)
        country_id = countries.get_country_id_by_name(airline.country)
        new_airline = admin.add_airline(airline.name, country_id, airline.user_id)
        admin.update_role(new_airline.user_id, 2)
        created = airlines.get_airline_by_user_id(airline.user_id)
        airline = AirlineOut(id=created.id, name=created.name,
                             country=created.country.country_name)
        return airline

    def remove_airline(self, airline_id):
        # ADD CHECK FOR ACTIVE FLIGHTS #

        airline = admin.delete_airline(airline_id)
        return airline

    def add_administrator(self, new_admin: AdminIn):
        """ Add new admin and associate it with existing user """
        self.customer_delete_if_exists(new_admin.user_id)
        self.airline_delete_if_exists(new_admin.user_id)
        if admin.get_admin_by_user_id(new_admin.user_id) is not None:
            raise APIException(status_code=400,
                               detail=f"Admin with user ID {new_admin.user_id} already exists.")
        new_admin = admin.add_administrator(new_admin)
        admin.update_role(new_admin.user_id, 1)
        return new_admin

    def remove_administrator(self, admin_id):
        """ Delete admin and associated user """
        admin_del = admin.delete_administrator(admin_id)
        return admin_del
    
    def admin_delete_if_exists(self, user_id):
        admin_db = admin.get_admin_by_user_id(user_id)
        if admin_db is not None:
            admin.delete_administrator(admin_db.id)
    
    def customer_delete_if_exists(self, user_id):
        customer_db = customers.get_customer_by_user_id(user_id)
        if customer_db is not None:
            admin.delete_customer(customer_db.id)

    def airline_delete_if_exists(self, user_id):
        airline_db = airlines.get_airline_by_user_id(user_id)
        if airline_db is not None:
            admin.delete_airline(airline_db.id)
