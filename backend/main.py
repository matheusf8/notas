from fastapi import FastAPI
from banco import Base, engine
from order_rotas import router as nota_router
from auth_rotas import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

# cria as tabelas no banco
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# inclui os routers
app.include_router(nota_router, prefix="/notas", tags=["notas"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
