import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@mui/material";
import FormNota from "../componentes/FormNota";
import ListaNotas from "../componentes/ListaNotas";

export default function Principal({ onLogout }) {
  const [notas, setNotas] = useState([]);
  const [notaEditando, setNotaEditando] = useState(null);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  function getToken() {
    return localStorage.getItem("token");
  }

  async function carregarNotas() {
    const resp = await fetch("https://meu_app_notas.onrender.com/notas/", {
      headers: { "Authorization": `Bearer ${getToken()}` }
    });
    setNotas(await resp.json());
  }

  async function salvarNota(nota) {
    if (notaEditando) {
      await fetch(`https://meu_app_notas.onrender.com/notas/${notaEditando.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nota),
      });
      setNotaEditando(null);
    } else {
      await fetch("https://meu_app_notas.onrender.com/notas/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nota),
      });
    }
    carregarNotas();
  }

  async function deletarNota(id) {
    await fetch(`https://meu_app_notas.onrender.com/notas/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${getToken()}` }
    });
    carregarNotas();
  }

  function encerrarSessao() {
    onLogout();
    localStorage.removeItem("token"); // limpa token ao sair
    navigate("/");
  }

  useEffect(() => {
    carregarNotas();
  }, []);

  const notasFiltradas = notas.filter((n) =>
    n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    n.conteudo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>📒 Minhas Anotações</Typography>
      <Button variant="contained" color="error" sx={{ mb: 2 }} onClick={encerrarSessao}>Encerrar Sessão</Button>
      <TextField
        label="Buscar notas..."
        fullWidth
        margin="normal"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <FormNota onSalvar={salvarNota} notaEditando={notaEditando} />
      <ListaNotas notas={notasFiltradas} onDeletar={deletarNota} onEditar={setNotaEditando} />
    </Container>
  );
}
