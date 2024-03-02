"use client";

import { OrderModel } from "@/models/order.model";
import { createOrder } from "@/services/order.service";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function OrderCreateForm() {
  const router = useRouter();

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
    console.log(newOrder);
    await createOrder(newOrder);
    router.push("/order");
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
        <h2>Cadastro de Pedido</h2>
      </Box>
      <Box>
        <form onSubmit={submitOrder}>
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <Button variant="outlined" onClick={() => router.push("/order")}>
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
