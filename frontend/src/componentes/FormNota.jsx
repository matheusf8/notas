import { useState, useEffect } from "react";
import { Paper, TextField, Button } from "@mui/material";

export default function FormNota({ onSalvar, notaEditando }) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    if (notaEditando) {
      setTitulo(notaEditando.titulo);
      setConteudo(notaEditando.conteudo);
    }
  }, [notaEditando]);

  function salvar() {
    if (titulo && conteudo) {
      onSalvar({ titulo, conteudo });
      setTitulo("");
      setConteudo("");
    } else {
      alert("Preencha título e conteúdo!");
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <TextField
        label="Título"
        fullWidth
        margin="normal"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <TextField
        label="Conteúdo"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
      />
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={salvar}
      >
        {notaEditando ? "Atualizar Nota" : "Salvar Nota"}
      </Button>
    </Paper>
  );
}
