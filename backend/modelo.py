from pydantic import BaseModel

class Usuario(BaseModel):
    nome: str
    senha: str

class Nota(BaseModel):
    titulo: str
    conteudo: str
