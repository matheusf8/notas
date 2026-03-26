from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

URL_BANCO = "postgresql://minhasnotas_user:VbAJL53o5vn5F5xkFuf8hoWaRXy80Hhk@dpg-d72r6jp9fqoc73c8def0-a:5432/minhasnotas"

engine = create_engine(URL_BANCO, connect_args={"check_same_thread": False})
SessaoLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def obter_sessao():
    db = SessaoLocal()
    try:
        yield db
    finally:
        db.close()
