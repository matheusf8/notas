import { Grid, Paper, Typography, Button } from "@mui/material";

export default function ListaNotas({ notas, onDeletar, onEditar }) {
  return (
    <Grid container spacing={3}>
      {notas.map((n) => (
        <Grid item xs={12} md={6} lg={4} key={n.id}>
          <Paper elevation={2} sx={{ p: 3, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 180 }}>
            <div>
              <Typography variant="h6" gutterBottom>{n.titulo}</Typography>
              <Typography variant="body2">{n.conteudo}</Typography>
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onEditar(n)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDeletar(n.id)}
              >
                Deletar
              </Button>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
