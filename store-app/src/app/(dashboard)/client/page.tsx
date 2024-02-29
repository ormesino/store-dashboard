"use client";

import ContentTable from "@/components/content-table";
import { ClientDto } from "@/dtos/client.dto";
import { ClientModel } from "@/models/client.model";
import {
  createClient,
  deleteClient,
  getClients,
} from "@/services/client.service";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ClientView() {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const titles = ["Código", "Nome", "Email", "Telefone", "CPF"];

  async function refreshClients() {
    await getClients().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }

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
    setOpen(false);
    await refreshClients();
  }

  useEffect(() => {
    refreshClients();
  }, []);

  const ClientForm = () => {
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            component: "form",
            onSubmit: submitClient,
          }}
        >
          <DialogTitle>Formulário de Cliente</DialogTitle>
          <DialogContent>
            <Container>
              <Grid container spacing={1}>
                <Grid item xs={12}>
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
                    value={selectedClient?.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={selectedClient?.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Telefone"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={selectedClient?.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="dense"
                    id="cpf"
                    name="cpf"
                    label="CPF"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={selectedClient?.cpf}
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="outlined">
              Voltar
            </Button>
            {selectedClient ? (
              <Button type="submit" variant="contained" color="warning">
                Atualizar
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="success">
                Cadastrar
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        gap: "3rem",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ContentTable
            header={titles}
            data={clients}
            handleContent={setClients}
            handleDelete={deleteClient}
            handleFormDialog={setOpen}
            handleUpdate={setSelectedClient}
          />

          <Button
            onClick={() => {
              setOpen(true);
              setSelectedClient(null);
            }}
            variant="contained"
            color="success"
          >
            Adicionar Cliente
          </Button>

          <ClientForm />
        </>
      )}
    </Box>
  );
}
