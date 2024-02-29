"use client";

import ContentTable from "@/components/content-table";
import { OrderDto } from "@/dtos/order.dto";
import { OrderModel } from "@/models/order.model";
import { createOrder, deleteOrder, getOrders } from "@/services/order.service";
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

export default function OrderView() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [open, setOpen] = useState(false);

  const titles = [
    "Código",
    "Cliente",
    "Produto",
    "Qntd Produto",
    "Valor Total",
    "Status do Pedido",
  ];

  async function refreshOrders() {
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
  }

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { client_id, product_id, quantity, total } = formJson;
    const newOrder: OrderModel = {
      client_id: parseInt(client_id),
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
      total: parseFloat(total),
    };
    await createOrder(newOrder);
    setOpen(false);
    await refreshOrders();
  }

  useEffect(() => {
    refreshOrders();
  }, []);

  const ProductForm = () => {
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            component: "form",
            onSubmit: submitOrder,
          }}
        >
          <DialogTitle>Formulário de Produto</DialogTitle>
          <DialogContent>
            <Container>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="client_id"
                    name="client_id"
                    label="Código do Cliente"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="dense"
                    id="product_id"
                    name="product_id"
                    label="Código do Produto"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="quantity"
                    name="quantity"
                    label="Quantidade do Produto"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    margin="dense"
                    id="total"
                    name="total"
                    label="Valor Total"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="outlined">
              Voltar
            </Button>
            {selectedOrder ? (
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
            data={orders}
            handleContent={setOrders}
            handleDelete={deleteOrder}
            handleFormDialog={setOpen}
            handleUpdate={setSelectedOrder}
          />

          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="success"
          >
            Adicionar Pedido
          </Button>

          <ProductForm />
        </>
      )}
    </Box>
  );
}
