from typing import Optional
from pydantic import BaseModel, NonNegativeInt, field_validator, ConfigDict
from utils.cryptography import decrypt_mask, encrypt


class CustomerIn(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    first_name: str
    last_name: str
    address: str
    phone_no: str
    credit_card: Optional[str]
    user_id: Optional[int] = None

    @field_validator('credit_card')
    def credit_card_encrypt(cls, value):
        """ Credit card number encryption """
        if value == None:
            return ''
        card = encrypt(value)
        value = card
        return value


class CustomerOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: Optional[int] | None = None
    user_id: Optional[int] | None = None
    username: Optional[str] | None = None
    first_name: Optional[str] | None = None
    last_name: Optional[str] | None = None
    address: Optional[str] | None = None
    phone_no: Optional[str] | None = None
    credit_card: Optional[str] | None = None

    @field_validator('credit_card')
    def credit_card_decrypt(cls, value):
        """ Credit card number decryption and 'X' masking"""
        if value == None:
            return ''
        card = decrypt_mask(value)
        value = card
        return value
