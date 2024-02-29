import { ProductDto } from "@/dtos/product.dto";

export const getProducts = async (): Promise<ProductDto[]> => {
  const response = await fetch("http://localhost:8000/api/products");
  return await response.json();
}

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`http://localhost:8000/api/products/${id}`, {
    method: "DELETE",
  });
}