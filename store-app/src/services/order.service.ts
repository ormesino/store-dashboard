import { OrderDto } from "@/dtos/order.dto";
import { OrderModel } from "@/models/order.model";

export const getOrders = async (): Promise<OrderDto[]> => {
  const response = await fetch("http://localhost:8000/api/orders");
  return await response.json();
};

export const deleteOrder = async (id: number): Promise<void> => {
  await fetch(`http://localhost:8000/api/orders/${id}`, {
    method: "DELETE",
  });
};

export const createOrder = async (order: OrderModel): Promise<void> => {
  await fetch("http://localhost:8000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
};

export const updateOrder = async (id: number, order: OrderModel): Promise<void> => {
  await fetch(`http://localhost:8000/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
};
