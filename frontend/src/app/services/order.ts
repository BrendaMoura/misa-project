import { CreateOrderMapDto, Order, OrderProduct } from "../types/order";
import api from "./api";

export async function getOrders(): Promise<Order[]> {
  return api.get("/orders").then((response) => response.data);
}

export async function getOrderProducts(id: string): Promise<OrderProduct[]> {
  return api.get(`/orders/products/${id}`).then((response) => response.data);
}

export async function createOrder(mapOrder: CreateOrderMapDto) {
  const order = {
    ...mapOrder,
    products: Array.from(mapOrder.products.entries()).map(([productId, { quantity }]) => ({
      productId,
      quantity,
    })),
  };

  return api.post("/orders", order).then((response) => response.data);
}

export async function updateOrder(id: string, status: string) {
  return api.put(`/orders/${id}`, { status }).then((response) => response.data);
}

export async function deleteOrder(id: string) {
  return api.delete(`/orders/${id}`);
}
