from pydantic import BaseModel, ConfigDict


class CountryBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    country_name: str


class TokenData(BaseModel):
    username: str | None = None
    scopes: str
