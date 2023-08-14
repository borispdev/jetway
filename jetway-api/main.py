import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination
from routers import authentication, administrator, airlines, countries, customers, flights, tickets, users

# models.Base.metadata.create_all(bind=engine) -- not used: migrations managed by Alembic

app = FastAPI(
    title='JetWay API',
    description='JetWay flights app api',
    version='1.0b',
    docs_url='/docs',
    redoc_url='/redoc',
    openapi_url='/openapi.json'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# @app.get('/')
# async def root(request: Request):
#     return {'message': "Don't panic."}

app.include_router(authentication.router)
app.include_router(administrator.router)
app.include_router(airlines.router)
app.include_router(countries.router)
app.include_router(customers.router)
app.include_router(flights.router)
app.include_router(tickets.router)
app.include_router(users.router)

add_pagination(app)

if __name__ == '__main__':
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )