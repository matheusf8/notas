from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from banco import obter_sessao
from tabelas import UsuarioDB
from modelo import Usuario

router = APIRouter()

@router.post("/cadastro")
def cadastrar_usuario(usuario: Usuario, db: Session = Depends(obter_sessao)):
    novo_usuario = UsuarioDB(nome=usuario.nome, senha=usuario.senha)
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

@router.post("/login")
def login(usuario: Usuario, db: Session = Depends(obter_sessao)):
    user = db.query(UsuarioDB).filter(UsuarioDB.nome == usuario.nome, UsuarioDB.senha == usuario.senha).first()
    if user:
        return {"mensagem": "Login realizado com sucesso"}
    return {"erro": "Usuário ou senha inválidos"}
