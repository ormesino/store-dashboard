"use client";

import ContentTable from "@/components/content-table";
import { ProductDto } from "@/dtos/product.dto";
import {
  deleteProduct,
  getProducts
} from "@/services/product.service";
import {
  Box,
  Button,
  CircularProgress
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductView() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const titles = ["Código", "Nome", "Preço (R$)", "Descrição"];

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
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
            data={products}
            handleContent={setProducts}
            handleDelete={deleteProduct}
            url="/product"
          />

          <Button
            onClick={() => {
              router.push("/product/create");
            }}
            variant="contained"
            color="success"
          >
            Adicionar Produto
          </Button>
        </>
      )}
    </Box>
  );
}
