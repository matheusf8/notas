import { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastrar() {
    const resp = await fetch("https://notas-u4ox.onrender.com/auth/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: nome, password: senha }),
    });
    await resp.json();
    alert("Usuário cadastrado com sucesso!");
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>Crie sua conta ✨</Typography>
        <TextField label="Nome" fullWidth margin="normal" value={nome} onChange={e => setNome(e.target.value)} />
        <TextField label="Senha" type="password" fullWidth margin="normal" value={senha} onChange={e => setSenha(e.target.value)} />
        <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={cadastrar}>Cadastrar</Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Já tem conta? <Link to="/">Faça login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
