from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


class UserRole(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    role_name: str
    description: str


class UserInput(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    # id: Optional[int]
    username: str
    password: str
    email: EmailStr


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str

class UserOutAdmin(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    role_name: Optional[str] | None = None


class LoginIn(BaseModel):
    username: str
    password: str


class Token(BaseModel):

    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
    scopes: str
