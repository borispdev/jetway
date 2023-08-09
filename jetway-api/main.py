import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routers import basic, airline, customer, admin
from routers import authentication

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


@app.get('/')
async def root(request: Request):
    return {'message': "Don't panic.", "root_path": request.scope.get("root_path")}

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