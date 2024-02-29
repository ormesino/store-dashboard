"use client";

import { ProductModel } from "@/models/product.model";
import { getProduct, updateProduct } from "@/services/product.service";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductCreateForm({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const product = await getProduct(params.id);
      setProduct(product);
    })();
  }, [params.id]);

  async function submitProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { name, price, description } = formJson;
    const updatedProduct: ProductModel = {
      name,
      price,
      description,
    };
    await updateProduct(params.id, updatedProduct);
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
        <h2>Atualizar Registro do Produto</h2>
      </Box>
      <Box>
        <form onSubmit={submitProduct}>
          <Grid container spacing={1} columns={6}>
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
                value={product?.name || ""}
                onChange={(e) =>
                  setProduct({
                    ...(product as ProductModel),
                    name: e.target.value,
                  })
                }
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
                value={product?.price || ""}
                onChange={(e) =>
                  setProduct({
                    ...(product as ProductModel),
                    price: parseInt(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="desescription"
                label="Descrição"
                multiline
                fullWidth
                rows={4}
                value={product?.description || ""}
                onChange={(e) =>
                  setProduct({
                    ...(product as ProductModel),
                    description: e.target.value,
                  })
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
