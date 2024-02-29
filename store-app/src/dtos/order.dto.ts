import { ClientDto } from "./client.dto";
import { ProductDto } from "./product.dto";

export type OrderDto = {
  id: number;
  clientName: string | undefined;
  productName: string | undefined;
  quantity: number;
  total: number;
  client?: ClientDto;
  product?: ProductDto;
  status: string;
}