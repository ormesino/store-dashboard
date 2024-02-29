"use client";

import ContentTable from "@/components/content-table";
import { ProductDto } from "@/dtos/product.dto";
import { ProductModel } from "@/models/product.model";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "@/services/product.service";
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

export default function ProductView() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const titles = ["Código", "Nome", "Preço", "Descrição"];

  async function refreshProducts() {
    await getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }

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
    setOpen(false);
    await refreshProducts();
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  const ProductForm = () => {
    return (
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            component: "form",
            onSubmit: submitProduct,
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
                    id="desescription"
                    label="Descrição"
                    multiline
                    fullWidth
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="outlined">
              Voltar
            </Button>
            <Button type="submit" variant="contained" color="success">
              Cadastrar
            </Button>
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
            data={products}
            handleContent={setProducts}
            handleDelete={deleteProduct}
            handleFormDialog={setOpen}
          />

          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="success"
          >
            Adicionar Produto
          </Button>

          <ProductForm />
        </>
      )}
    </Box>
  );
}
