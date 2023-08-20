from os import environ
from cryptography.fernet import Fernet

def get_encryption_key():
    """
    Get encryption key file or env. variable.
    """
    key = ''
    if environ['ENCRYPTION_KEY_FILE'] is not None:
        with open(environ['ENCRYPTION_KEY_FILE']) as file:
            key = file.read()
    else:
        key = environ['ENCRYPTION_KEY']
    return bytes(key.strip())

crypt = Fernet(get_encryption_key())


def encrypt(data: str):
    return crypt.encrypt(data.encode())


def decrypt(encrypted: str):
    return crypt.decrypt(encrypted).decode()


def mask(decrypted: str):
    """
    Mask credit card number with "X" and leave last 4 digits.
    """
    masked = decrypted[-4:].rjust(len(decrypted), 'X')
    return masked


def decrypt_mask(encrypted):
    """
    Decrypt credit card number and mask it.
    """
    if encrypted == '':
        return ''
    decrypted = decrypt(encrypted)
    masked = mask(decrypted)
    return masked
