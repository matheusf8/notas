from sqlalchemy import Column, Integer, String
from banco import Base

class NotaDB(Base):
    __tablename__ = "notas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    conteudo = Column(String, nullable=False)


class UsuarioDB(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False, unique=True)
    senha = Column(String, nullable=False)
