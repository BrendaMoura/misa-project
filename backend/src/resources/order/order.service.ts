import { PrismaClient } from "@prisma/client";
import {
  CreateOrderDto,
  CreateOrderProductDto,
  OrderDto,
  OrderProductDto,
  UpdateOrderDto,
} from "./order.types";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export const createOrder = async (order: CreateOrderDto): Promise<OrderDto> => {
  const newOrder = await prisma.order.create({
    data: {
      vendorId: order.vendorId,
      status: order.status,
    },
  });

  order.products.forEach(async (product) => {
    await createOrderProduct(newOrder.id, product);
  });

  return newOrder;
};

const createOrderProduct = async (orderId: string, product: CreateOrderProductDto) => {
  const productInfo = await prisma.product.findUnique({
    where: { id: product.productId },
  });

  if (!productInfo) return;

  await prisma.orderProduct.create({
    data: {
      orderId: orderId,
      productId: product.productId,
      quantity: product.quantity,
      total: new Decimal(productInfo.price).mul(product.quantity),
    },
  });
};

export const listOrders = async (): Promise<OrderDto[]> => {
  return await prisma.order.findMany({
    select: {
      id: true,
      vendorId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const listOrderProducts = async (id: string): Promise<OrderProductDto[] | null> => {
  return await prisma.orderProduct.findMany({
    select: {
      id: true,
      productId: true,
      quantity: true,
      total: true,
    },
    where: { orderId: id },
  });
};

export const readOrder = async (id: string): Promise<OrderDto | null> => {
  return await prisma.order.findUnique({
    select: {
      id: true,
      vendorId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updateOrder = async (
  id: string,
  updatedOrder: UpdateOrderDto,
): Promise<OrderDto | null> => {
  return await prisma.order.update({
    where: { id },
    data: updatedOrder,
  });
};

export const deleteOrder = async (id: string): Promise<OrderDto> => {
  return await prisma.order.delete({ where: { id } });
};
