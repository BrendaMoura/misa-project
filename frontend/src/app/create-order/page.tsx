"use client";

import {
  Box,
  Container,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useVendors } from "../hooks/useVendors";
import { CreateOrderDto } from "../types/order";
import ProductRow from "../components/ProductRow";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types/product";
import SearchIcon from "@mui/icons-material/Search";

const initialState: CreateOrderDto = {
  vendorId: "",
  status: "Em andamento",
  products: [],
};

const getProductInfo = (products: Product[], productId: string) => {
  return products.find((product) => product.id === productId);
};

export default function CreateOrder() {
  const [order, setOrder] = useState<CreateOrderDto>(initialState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { vendors } = useVendors();
  const { products } = useProducts();

  const handleChange = (event: any) => {
    setOrder({ ...order, vendorId: event.target.value });
  };

  const handleProductSelection = (productId: string) => {
    const newProduct = {
      productId: productId,
      quantity: 1,
    };
    setOrder({ ...order, products: [...order.products, newProduct] });
    setAnchorEl(null);
  };

  const handleClickSearchBar = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    e.stopPropagation();
  };

  const handleCloseSearchMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ marginY: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", m: "auto" }} component="h2">
        Criar Pedido
      </Typography>

      <Typography variant="body2" component="h2" sx={{ mt: 6, mb: 2, fontWeight: "bold" }}>
        Fornecedor
      </Typography>

      <Select displayEmpty value={order.vendorId} onChange={handleChange} sx={{ width: "100%" }}>
        <MenuItem value="" disabled>
          Selecione o fornecedor
        </MenuItem>
        {vendors?.map((vendor) => (
          <MenuItem key={vendor.id} value={vendor.id}>
            {vendor.name}
          </MenuItem>
        ))}
      </Select>

      <Typography variant="body2" component="h2" sx={{ marginY: 4, fontWeight: "bold" }}>
        Produtos
      </Typography>

      <Box sx={{ display: "flex", width: "100%", justifyContent: "end", mb: 5 }}>
        <TextField
          id="filled-search"
          placeholder="Pesquise pelo produto"
          type="search"
          variant="outlined"
          size="small"
          onClick={handleClickSearchBar}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Menu id="products" anchorEl={anchorEl} open={open} onClose={handleCloseSearchMenu}>
          {products?.map((product) => (
            <MenuItem key={product.id} onClick={() => handleProductSelection(product.id)}>
              {product.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>

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
            {order.products.map((product) => (
              <ProductRow product={getProductInfo(products, product.productId)!} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
