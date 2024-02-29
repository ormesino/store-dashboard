"use client";

import ContentTable from "@/components/content-table";
import { ClientDto } from "@/dtos/client.dto";
import { deleteClient, getClients } from "@/services/client.service";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function ClientView() {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }, []);

  const titles = ["Código", "Nome", "Email", "Telefone", "CPF"];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <ContentTable
          header={titles}
          data={clients}
          handleContent={setClients}
          handleDelete={deleteClient}
        />
      )}
    </Box>
  );
}
