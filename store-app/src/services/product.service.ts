import { ProductDto } from "@/dtos/product.dto";

export const getProducts = async (): Promise<ProductDto[]> => {
  const response = await fetch("http://localhost:8000/api/products");
  return await response.json();
}