from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

URL_BANCO = "sqlite:///./notas.db"

engine = create_engine(
    URL_BANCO, connect_args={"check_same_thread": False}
)

SessaoLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def obter_sessao():
    db = SessaoLocal()
    try:
        yield db
    finally:
        db.close()
