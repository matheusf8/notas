
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from banco import obter_sessao
from tabelas import NotaDB
from modelo import Nota
from seguranca import obter_usuario_logado

router = APIRouter(tags=["notas"]) 

@router.post("/")
def criar_nota(nota: Nota, db: Session = Depends(obter_sessao), usuario: str = Depends(obter_usuario_logado)):
    nova_nota = NotaDB(titulo=nota.titulo, conteudo=nota.conteudo)
    db.add(nova_nota)
    db.commit()
    db.refresh(nova_nota)
    return nova_nota

@router.get("/")
def listar_notas(db: Session = Depends(obter_sessao), usuario: str = Depends(obter_usuario_logado)):
    return db.query(NotaDB).all()

@router.put("/{nota_id}")
def atualizar_nota(nota_id: int, nota: Nota, db: Session = Depends(obter_sessao), usuario: str = Depends(obter_usuario_logado)):
    nota_db = db.query(NotaDB).filter(NotaDB.id == nota_id).first()
    if nota_db:
        nota_db.titulo = nota.titulo
        nota_db.conteudo = nota.conteudo
        db.commit()
        db.refresh(nota_db)
        return nota_db
    return {"erro": "Nota não encontrada"}

@router.delete("/{nota_id}")
def deletar_nota(nota_id: int, db: Session = Depends(obter_sessao), usuario: str = Depends(obter_usuario_logado)):
    nota = db.query(NotaDB).filter(NotaDB.id == nota_id).first()
    if nota:
        db.delete(nota)
        db.commit()
        return {"mensagem": "Nota deletada com sucesso"}
    return {"erro": "Nota não encontrada"}
