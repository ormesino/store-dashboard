"use client";

import { ProductModel } from "@/models/product.model";
import { createProduct } from "@/services/product.service";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProductCreateForm() {
  const router = useRouter();

  async function submitProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { name, price, description } = formJson;
    const newProduct: ProductModel = {
      name,
      price,
      description,
    };
    await createProduct(newProduct);
    router.push("/product");
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
        <h2>Cadastro de Produto</h2>
      </Box>
      <Box>
        <form onSubmit={submitProduct}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="price"
                name="price"
                label="Preço"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Descrição"
                multiline
                fullWidth
                rows={4}
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
            <Button variant="outlined" onClick={() => router.push("/product")}>
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
