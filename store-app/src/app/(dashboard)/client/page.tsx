"use client";

import ContentTable from "@/components/content-table";
import { ClientDto } from "@/dtos/client.dto";
import {
  deleteClient,
  getClients
} from "@/services/client.service";
import {
  Box,
  Button,
  CircularProgress
} from "@mui/material";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function ClientView() {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const titles = ["Código", "Nome", "Email", "Telefone", "CPF"];

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }, []);

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
            url="/client"
          />

          <Button
            onClick={() => {
              router.push("/client/create");
            }}
            variant="contained"
            color="success"
          >
            Adicionar Cliente
          </Button>
        </>
      )}
    </Box>
  );
}
