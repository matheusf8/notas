from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from banco import obter_sessao
from tabelas import UsuarioDB
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter(tags=["auth"]) 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "chave_super_secreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_senha(senha: str):
    return pwd_context.hash(senha[:72])

def verificar_senha(senha: str, hash: str):
    return pwd_context.verify(senha[:72], hash)


def criar_token(dados: dict, expira_em: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = dados.copy()
    expire = datetime.utcnow() + timedelta(minutes=expira_em)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/cadastro")
def cadastrar_usuario(username: str = Form(...), password: str = Form(...), db: Session = Depends(obter_sessao)):
    existente = db.query(UsuarioDB).filter(UsuarioDB.nome == username).first()
    if existente:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    novo_usuario = UsuarioDB(nome=username, senha=hash_senha(password))
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return {"mensagem": "Usuário cadastrado com sucesso"}

@router.post("/login")
def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(obter_sessao)):
    user = db.query(UsuarioDB).filter(UsuarioDB.nome == username).first()
    if not user or not verificar_senha(password, user.senha):
        raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")
    token = criar_token({"sub": user.nome})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/resetar_senha")
def resetar_senha(username: str = Form(...), nova_senha: str = Form(...), db: Session = Depends(obter_sessao)):
    user = db.query(UsuarioDB).filter(UsuarioDB.nome == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    user.senha = hash_senha(nova_senha)
    db.commit()
    db.refresh(user)
    return {"mensagem": "Senha atualizada com sucesso"}
