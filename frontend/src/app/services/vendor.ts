import { Vendor } from "../types/vendor";
import api from "./api";

export async function getVendors(): Promise<Vendor[]> {
  return api.get("/vendors").then((response) => response.data);
}

export async function getVendor(id: string): Promise<Vendor> {
  return api.get(`/vendors/${id}`).then((response) => response.data);
}
