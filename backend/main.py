from fastapi import FastAPI
from banco import Base, engine
from notas_rotas import router as nota_router
from auth_rotas import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Notas",
    description="Backend seguro com JWT",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://notas-app-seu-beige.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(nota_router, prefix="/notas", tags=["notas"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
