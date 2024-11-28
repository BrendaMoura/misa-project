import { PrismaClient } from "@prisma/client";
import { VendorDto } from "./vendor.types";

const prisma = new PrismaClient();

export const listVendors = async (): Promise<VendorDto[]> => {
  return await prisma.vendor.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const readVendor = async (id: string): Promise<VendorDto | null> => {
  return await prisma.vendor.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};
