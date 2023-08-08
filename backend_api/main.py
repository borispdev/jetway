from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import basic, airline, customer, admin
from routers import authentication

# models.Base.metadata.create_all(bind=engine) -- not used: migrations managed by Alembic

app = FastAPI()

# origins = ['http://localhost:3000', 'http://127.0.0.1:3000','http:81.28' '*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/')
async def root():
    return {'message': "Don't panic."}

app.include_router(basic.router)
app.include_router(airline.router)
app.include_router(customer.router)
app.include_router(admin.router)
app.include_router(authentication.router)
