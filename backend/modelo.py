from pydantic import BaseModel

class Nota(BaseModel):
    titulo: str
    conteudo: str

class Usuario(BaseModel):
    nome: str
    senha: str
