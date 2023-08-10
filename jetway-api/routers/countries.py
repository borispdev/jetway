from fastapi import APIRouter
from services.basefacade import BaseFacade
from schemas.basic import CountryBase

router = APIRouter(tags=['Countries'])
base_facade = BaseFacade()

@router.get('/countries/', response_model=list[CountryBase], name="Get all countries", )
async def read_countries():
    """ Get the whole country list """
    countries = base_facade.get_all_countries()
    return countries

@router.get('/countries/{country_id}', response_model=CountryBase, name="Get country by ID")
async def read_country(country_id):
    """ Find country by its ID """
    country = base_facade.get_country(country_id)
    return country