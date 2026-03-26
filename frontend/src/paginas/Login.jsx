import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";

export default function Login({ onLogin }) {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function login() {
    const resp = await fetch("https://meu_app_notas.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: nome, password: senha }),
    });
    const data = await resp.json();

    if (resp.ok && data.access_token) {
      localStorage.setItem("token", data.access_token);
      onLogin();
      navigate("/principal");
    } else {
      alert("Usuário ou senha inválidos");
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>Bem-vindo 👋</Typography>
        <Typography variant="body1" gutterBottom>Faça login para acessar suas notas</Typography>
        <TextField label="Nome" fullWidth margin="normal" value={nome} onChange={e => setNome(e.target.value)} />
        <TextField label="Senha" type="password" fullWidth margin="normal" value={senha} onChange={e => setSenha(e.target.value)} />
        <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={login}>Entrar</Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Esqueceu a senha? <Link to="/reset-senha">Resetar</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
