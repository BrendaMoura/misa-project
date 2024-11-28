import { ListItemIcon, TableCell, TableRow } from "@mui/material";
import { Product } from "../types/product";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductRowProps {
  product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => {
  return (
    <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {product.name}
      </TableCell>
      <TableCell align="right">{product.price}</TableCell>
      <TableCell align="right">7</TableCell>
      <TableCell align="right">7</TableCell>
      <TableCell align="right">
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;
