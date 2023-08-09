from typing import Optional
from pydantic import BaseModel, ConfigDict


class AdminIn(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    first_name: str
    last_name: str
    user_id: int


class AdminOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Optional[int] | None = None
    user_id: Optional[int] | None = None
    username: Optional[str] | None = None
    first_name: str
    last_name: str