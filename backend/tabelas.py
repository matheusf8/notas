from sqlalchemy import Column, Integer, String
from banco import Base

class UsuarioDB(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, index=True)
    senha = Column(String)

class NotaDB(Base):
    __tablename__ = "notas"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    conteudo = Column(String)
