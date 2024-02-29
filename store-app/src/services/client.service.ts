import { ClientDto } from "@/dtos/client.dto";
import { ClientModel } from "@/models/client.model";

export const getClients = async (): Promise<ClientDto[]> => {
  const response = await fetch("http://localhost:8000/api/clients");
  return await response.json();
};

export const deleteClient = async (id: number): Promise<void> => {
  await fetch(`http://localhost:8000/api/clients/${id}`, {
    method: "DELETE",
  });
};

export const createClient = async (client: ClientModel): Promise<void> => {
  await fetch("http://localhost:8000/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
};

export const updateClient = async (id: number, client: ClientModel): Promise<void> => {
  await fetch(`http://localhost:8000/api/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
}