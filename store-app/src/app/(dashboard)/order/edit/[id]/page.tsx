"use client";

import { OrderModel } from "@/models/order.model";
import { getOrder, updateOrder } from "@/services/order.service";
import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderCreateForm({
  params,
}: {
  params: { id: string };
}) {
  const [order, setOrder] = useState<OrderModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const order = await getOrder(params.id);
      setOrder(order);
    })();
  }, [params.id]);

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { client_id, product_id, quantity, total } = formJson;
    const updatedOrder: OrderModel = {
      client_id: parseInt(client_id),
      product_id: parseInt(product_id),
      quantity: parseInt(quantity),
      total: parseFloat(total),
    };
    await updateOrder(params.id, updatedOrder);
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
                value={order?.client_id || ""}
                onChange={(e) =>
                  setOrder({
                    ...(order as OrderModel),
                    client_id: parseInt(e.target.value),
                  })
                }
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
                value={order?.product_id || ""}
                onChange={(e) =>
                  setOrder({
                    ...(order as OrderModel),
                    product_id: parseInt(e.target.value),
                  })
                }
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
                value={order?.quantity || ""}
                onChange={(e) =>
                  setOrder({
                    ...(order as OrderModel),
                    quantity: parseInt(e.target.value),
                  })
                }
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
                value={order?.total || ""}
                onChange={(e) =>
                  setOrder({
                    ...(order as OrderModel),
                    total: parseInt(e.target.value),
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  required
                  id="status"
                  name="status"
                  label="Status"
                  value={order?.status || ""}
                  onChange={(e) =>
                    setOrder({
                      ...(order as OrderModel),
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Em Aberto"}>Em Aberto</MenuItem>
                  <MenuItem value={"Pago"}>Pago</MenuItem>
                  <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
                </Select>
              </FormControl>
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
            <Button type="submit" variant="contained" color="warning">
              Atualizar
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
