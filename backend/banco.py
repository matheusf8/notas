from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# Pegando da variável de ambiente (DATABASE_URL) ou usando valor padrão
URL_BANCO = os.getenv(
    "DATABASE_URL",
    "postgresql://minhasnotas_user:VbAJL53o5vn5F5xkFuf8hoWaRXy80Hhk@dpg-d72r6jp9fqoc73c8def0-a.oregon-postgres.render.com:5432/minhasnotas"
)

engine = create_engine(
    URL_BANCO,
    connect_args={"sslmode": "require"}  # Render exige SSL
)

SessaoLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def obter_sessao():
    db = SessaoLocal()
    try:
        yield db
    finally:
        db.close()
