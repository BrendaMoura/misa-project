export interface Order {
  id: string;
  vendorId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export type CreateOrderDto = {
  vendorId: string;
  status: string;
  products: CreateOrderProductDto[];
};

export type UpdateOrderDto = Pick<Order, "status">;

export type CreateOrderProductDto = {
  productId: string;
  quantity: number;
};

export type OrderProduct = {
  id: string;
  productId: string;
  quantity: number;
  total: number;
};
