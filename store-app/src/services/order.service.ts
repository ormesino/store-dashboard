import { OrderDto } from "@/dtos/order.dto";

export const getOrders = async (): Promise<OrderDto[]> => {
  const response = await fetch("http://localhost:8000/api/orders");
  return await response.json();
}