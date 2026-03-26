from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from banco import obter_sessao
from tabelas import NotaDB
from modelo import Nota

router = APIRouter()

# Criar nota
@router.post("/")
def criar_nota(nota: Nota, db: Session = Depends(obter_sessao)):
    nova_nota = NotaDB(titulo=nota.titulo, conteudo=nota.conteudo)
    db.add(nova_nota)
    db.commit()
    db.refresh(nova_nota)
    return nova_nota

# Listar todas as notas
@router.get("/")
def listar_notas(db: Session = Depends(obter_sessao)):
    return db.query(NotaDB).all()

# Buscar nota por ID
@router.get("/{nota_id}")
def buscar_nota(nota_id: int, db: Session = Depends(obter_sessao)):
    return db.query(NotaDB).filter(NotaDB.id == nota_id).first()

# Atualizar nota
@router.put("/{nota_id}")
def atualizar_nota(nota_id: int, nota: Nota, db: Session = Depends(obter_sessao)):
    nota_db = db.query(NotaDB).filter(NotaDB.id == nota_id).first()
    if nota_db:
        nota_db.titulo = nota.titulo
        nota_db.conteudo = nota.conteudo
        db.commit()
        db.refresh(nota_db)
        return nota_db
    return {"erro": "Nota não encontrada"}

# Deletar nota
@router.delete("/{nota_id}")
def deletar_nota(nota_id: int, db: Session = Depends(obter_sessao)):
    nota = db.query(NotaDB).filter(NotaDB.id == nota_id).first()
    if nota:
        db.delete(nota)
        db.commit()
        return {"mensagem": "Nota deletada com sucesso"}
    return {"erro": "Nota não encontrada"}
