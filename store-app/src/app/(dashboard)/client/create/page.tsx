"use client";

import { ClientModel } from "@/models/client.model";
import { createClient } from "@/services/client.service";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ClientCreateForm() {
  const router = useRouter();

  async function submitClient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { name, email, phone, cpf } = formJson;
    const newClient: ClientModel = {
      name,
      email,
      phone,
      cpf,
    };
    await createClient(newClient);
    router.push("/client");
  }

  return (
    <Card
      sx={{
        width: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        margin: "1rem",
      }}
    >
      <Box>
        <h2>Cadastro de Cliente</h2>
      </Box>
      <Box>
        <form onSubmit={submitClient}>
          <Grid container spacing={1} columns={6}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Nome"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Telefone"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="cpf"
                name="cpf"
                label="CPF"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button variant="outlined" onClick={() => router.push("/client")}>
              Voltar
            </Button>
            <Button type="submit" variant="contained" color="success">
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
