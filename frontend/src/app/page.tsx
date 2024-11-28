"use client";
import React from "react";
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
import { useOrders } from "./hooks/useOrders";
import OrderRow from "./components/OrderRow";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

export default function Orders() {
  const router = useRouter();
  const { orders, isPending, isError } = useOrders();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  const handleCreateOrder = () => {
    router.push("/create-order");
  };

  return (
    <Container sx={{ marginY: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }} component="h2">
        Pedidos
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1.4,
          mb: 5,
        }}
      >
        <Typography variant="body2" component="h2">
          {orders.length} pedido(s) encontrado(s)
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none" }}
          onClick={handleCreateOrder}
        >
          Criar pedido
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Chave de acesso</TableCell>
              <TableCell align="right">Fornecedor</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
