"use client";

import ContentTable from "@/components/content-table";
import { OrderDto } from "@/dtos/order.dto";
import { deleteOrder, getOrders } from "@/services/order.service";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrdersView() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);

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

  const titles = [
    "Código",
    "Cliente",
    "Produto",
    "Qntd Produto",
    "Valor Total",
    "Status do Pedido",
  ];

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
          data={orders}
          handleContent={setOrders}
          handleDelete={deleteOrder}
        />
      )}
    </Box>
  );
}
