import { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ResetSenha() {
  const [username, setUsername] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  async function resetar() {
    const resp = await fetch("https://notas-5p4e.onrender.com/auth/resetar_senha", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, nova_senha: novaSenha }),
    });
    const data = await resp.json();
    if (resp.ok) {
      alert("Senha atualizada com sucesso!");
    } else {
      alert(data.detail || "Erro ao resetar senha");
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>🔑 Resetar Senha</Typography>
        <TextField label="Usuário" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField label="Nova Senha" type="password" fullWidth margin="normal" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={resetar}>Atualizar Senha</Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <Link to="/">Voltar para Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
