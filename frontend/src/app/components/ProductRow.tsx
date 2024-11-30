import { TableCell, TableRow, TextField } from "@mui/material";
import { Product } from "../types/product";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";

interface ProductRowProps {
  product: Product;
  productQuantity: number;
  handleUpdateProductQuantity: (productId: string, newQuantity: number) => void;
  handleDeleteProduct: (productId: string) => void;
}

const ProductRow = ({
  product,
  productQuantity,
  handleUpdateProductQuantity,
  handleDeleteProduct,
}: ProductRowProps) => {
  const [quantity, setQuantity] = useState(productQuantity);

  useEffect(() => {
    setQuantity(productQuantity);
  }, [productQuantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity <= 0) {
      handleDeleteProduct(product.id);
    } else {
      setQuantity(newQuantity);
      handleUpdateProductQuantity(product.id, newQuantity);
    }
  };

  return (
    <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell align="right">{product.price}</TableCell>
      <TableCell align="right">
        <TextField variant="outlined" type="number" value={quantity} onChange={handleInputChange} />
      </TableCell>
      <TableCell align="right">{(product.price * quantity).toFixed(2)}</TableCell>
      <TableCell align="right">
        <DeleteOutlineIcon
          fontSize="small"
          color="error"
          onClick={() => {
            handleDeleteProduct(product.id);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
