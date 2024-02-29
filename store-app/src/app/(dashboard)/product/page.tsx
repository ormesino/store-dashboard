"use client";

import ContentTable from "@/components/content-table";
import { ProductDto } from "@/dtos/product.dto";
import { getProducts } from "@/services/product.service";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProductView() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const titles = ["Código", "Nome", "Preço", "Descrição"];

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
        <ContentTable header={titles} data={products} />
      )}
    </Box>
  );
}
