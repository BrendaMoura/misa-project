import { Product } from "../types/product";
import api from "./api";

export async function getProducts(): Promise<Product[]> {
  return api.get("/products").then((response) => response.data);
}

export async function getProduct(id: string): Promise<Product> {
  return api.get(`/products/${id}`).then((response) => response.data);
}
