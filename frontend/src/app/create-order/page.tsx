"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { CreateOrderMapDto } from "../types/order";
import { Product } from "../types/product";
import ProductRow from "../components/ProductRow";
import VendorList from "../components/VendorList";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";
import SaveIcon from "@mui/icons-material/Save";
import { createOrder } from "../services/order";
import { useRouter } from "next/navigation";

const initialState: CreateOrderMapDto = {
  vendorId: "",
  status: "Em andamento",
  products: new Map<string, { quantity: number }>(),
};

const getProductInfo = (products: Product[], productId: string) => {
  return products.find((product) => product.id === productId);
};

export default function CreateOrder() {
  const router = useRouter();
  const [order, setOrder] = useState<CreateOrderMapDto>(initialState);

  const { products } = useProducts();

  const handleVendorSelection = (event: any) => {
    setOrder({ ...order, vendorId: event.target.value });
  };

  const handleUpdateProductQuantity = (productId: string, newQuantity: number) => {
    setOrder((prevOrder) => {
      const orderProducts = new Map(prevOrder.products);

      orderProducts.set(productId, { quantity: newQuantity });

      return { ...prevOrder, products: orderProducts };
    });
  };

  const handleProductSelection = (productId: string) => {
    setOrder((prevOrder) => {
      const orderProducts = new Map(prevOrder.products);

      if (orderProducts.has(productId)) {
        const existingProduct = orderProducts.get(productId)!;
        orderProducts.set(productId, { quantity: existingProduct.quantity + 1 });
      } else {
        orderProducts.set(productId, { quantity: 1 });
      }

      return { ...prevOrder, products: orderProducts };
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setOrder((prevOrder) => {
      const orderProducts = new Map(prevOrder.products);
      orderProducts.delete(productId);
      return { ...prevOrder, products: orderProducts };
    });
  };

  const handleSaveOrder = () => {
    if (!order.vendorId || order.products.size === 0)
      return alert("Selecione o vendendor e adicione produtos.");
    try {
      const savedOrder = createOrder(order);
      setOrder(initialState);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ marginY: 5 }}>
      <Box
        sx={{
          width: "100%",
          m: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }} component="h2">
          Criar Pedido
        </Typography>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveOrder}
          sx={{ textTransform: "none" }}
        >
          Salvar produto
        </Button>
      </Box>

      <VendorList handleChange={handleVendorSelection} vendorId={order.vendorId} />

      <Typography variant="body2" component="h2" sx={{ marginY: 4, fontWeight: "bold" }}>
        Produtos
      </Typography>

      <SearchBar handleProductSelection={handleProductSelection} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Opção</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...order.products].map(([productId, { quantity }]) => {
              const productInfo = getProductInfo(products, productId)!;
              return (
                <ProductRow
                  product={productInfo}
                  productQuantity={quantity}
                  handleUpdateProductQuantity={handleUpdateProductQuantity}
                  handleDeleteProduct={handleDeleteProduct}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
