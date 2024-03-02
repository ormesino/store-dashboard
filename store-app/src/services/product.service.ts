import { ProductDto } from "@/dtos/product.dto";
import { ProductModel } from "@/models/product.model";

export const getProducts = async (): Promise<ProductDto[]> => {
  const response = await fetch("http://localhost:8000/api/products");
  return await response.json();
};

export const getProduct = async (id: string): Promise<ProductModel> => {
  const response = await fetch(`http://localhost:8000/api/products/${id}`);
  return await response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  await fetch(`http://localhost:8000/api/products/${id}`, {
    method: "DELETE",
  });
};

export const createProduct = async (product: ProductModel): Promise<void> => {
  await fetch("http://localhost:8000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (id: string, product: ProductModel): Promise<void> => {
  await fetch(`http://localhost:8000/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
};
