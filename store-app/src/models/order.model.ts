export type OrderModel = {
  client_id: number;
  product_id: number;
  quantity: number;
  total: number;
  status?: string;
}