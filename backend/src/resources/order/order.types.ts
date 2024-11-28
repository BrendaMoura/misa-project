import { Order, OrderProduct } from "@prisma/client";

export type CreateOrderDto = {
  vendorId: string;
  status: string;
  products: CreateOrderProductDto[];
};

export type UpdateOrderDto = Pick<Order, "status">;
export type OrderDto = Order;

export type CreateOrderProductDto = Pick<OrderProduct, "productId" | "quantity">;

export type OrderProductDto = Pick<OrderProduct, "id" | "productId" | "quantity" | "total">;
