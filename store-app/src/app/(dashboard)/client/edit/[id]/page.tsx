"use client";

import { ClientModel } from "@/models/client.model";
import { getClient, updateClient } from "@/services/client.service";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientEditForm({
  params,
}: {
  params: { id: string };
}) {
  const [client, setClient] = useState<ClientModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const client = await getClient(params.id);
      setClient(client);
    })();
  }, [params.id]);

  async function submitClient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { name, email, phone, cpf } = formJson;
    const updatedClient: ClientModel = {
      name,
      email,
      phone,
      cpf,
    };
    await updateClient(params.id, updatedClient);
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
        <h2>Atualizar Registro do Cliente</h2>
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
                value={client?.name || ""}
                onChange={(e) =>
                  setClient({
                    ...(client as ClientModel),
                    name: e.target.value,
                  })
                }
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
                value={client?.email || ""}
                onChange={(e) =>
                  setClient({
                    ...(client as ClientModel),
                    email: e.target.value,
                  })
                }
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
                value={client?.phone || ""}
                onChange={(e) =>
                  setClient({
                    ...(client as ClientModel),
                    phone: e.target.value,
                  })
                }
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
                value={client?.cpf || ""}
                onChange={(e) =>
                  setClient({ ...(client as ClientModel), cpf: e.target.value })
                }
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
            <Button type="submit" variant="contained" color="warning">
              Atualizar
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
