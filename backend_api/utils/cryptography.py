from cryptography.fernet import Fernet

CRYPTO_SECRET_KEY = b'eDu1q-RZfvynJO-KY_z1432EigJLSHkHXGurg7YG0x4='

crypt = Fernet(CRYPTO_SECRET_KEY)


def encrypt(data: str):
    return crypt.encrypt(data.encode())


def decrypt(encrypted: str):
    return crypt.decrypt(encrypted).decode()


def mask(decrypted: str):
    masked = decrypted[-4:].rjust(len(decrypted), 'X')
    return masked


def decrypt_mask(encrypted):
    if encrypted == '':
        return ''
    decrypted = decrypt(encrypted)
    masked = mask(decrypted)
    return masked
