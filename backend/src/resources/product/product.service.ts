import { PrismaClient } from "@prisma/client";
import { ProductDto } from "./product.types";

const prisma = new PrismaClient();

export const listProducts = async (): Promise<ProductDto[]> => {
  return await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const readProduct = async (id: string): Promise<ProductDto | null> => {
  return await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};
