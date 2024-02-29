import { ClientDto } from "@/dtos/client.dto";

export const getClients = async (): Promise<ClientDto[]> => {
  const response = await fetch("http://localhost:8000/api/clients");
  return await response.json();
}

