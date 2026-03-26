import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import Login from "./paginas/Login";
import Cadastro from "./paginas/Cadastro";
import Principal from "./paginas/Principal";
import ResetSenha from "./paginas/ResetSenha";

export default function App() {
  const [modo, setModo] = useState("light");
  const [logado, setLogado] = useState(localStorage.getItem("logado") === "true");

  const theme = createTheme({
    palette: {
      mode: modo,
      primary: { main: "#6a1b9a" }, // Roxo
      secondary: { main: "#ff9800" }, // Laranja
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });

  function handleLogin() {
    localStorage.setItem("logado", "true");
    setLogado(true);
  }

  function handleLogout() {
    localStorage.removeItem("logado");
    setLogado(false);
    localStorage.removeItem("token"); // limpa token também
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Sistema de Notas
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setModo(modo === "light" ? "dark" : "light")}
            >
              <Brightness4Icon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/reset-senha" element={<ResetSenha />} />
          <Route
            path="/principal"
            element={
              logado ? (
                <Principal onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
