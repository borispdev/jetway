import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import basic, airline, customer, admin
from routers import authentication

# models.Base.metadata.create_all(bind=engine) -- not used: migrations managed by Alembic

app = FastAPI()

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


if __name__ == '__main__':
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )