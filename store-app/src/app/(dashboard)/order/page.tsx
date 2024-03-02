"use client";

import ContentTable from "@/components/content-table";
import { OrderDto } from "@/dtos/order.dto";
import { deleteOrder, getOrders } from "@/services/order.service";
import {
  Box,
  Button,
  CircularProgress
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderView() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const titles = [
    "Código",
    "Cliente",
    "Produto",
    "Qntd Produto",
    "Valor Total",
    "Status do Pedido",
  ];

  useEffect(() => {
    getOrders().then((data) => {
      const incOrders = data.map((order) => {
        return {
          id: order.id,
          clientName: order.client?.name,
          productName: order.product?.name,
          quantity: order.quantity,
          total: order.total,
          status: order.status,
        };
      });
      setOrders(incOrders);
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
            data={orders}
            handleContent={setOrders}
            handleDelete={deleteOrder}
            url="/order"
          />

          <Button
            onClick={
              () => router.push("/order/create")
            }
            variant="contained"
            color="success"
          >
            Adicionar Pedido
          </Button>
        </>
      )}
    </Box>
  );
}
