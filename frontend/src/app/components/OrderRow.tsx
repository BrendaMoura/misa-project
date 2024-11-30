import { useVendor } from "@/app/hooks/useVendor";
import { Order, OrderProduct } from "@/app/types/order";
import { formatDate } from "@/app/utils/datetime";
import { Chip, TableCell, TableRow } from "@mui/material";
import { useOrderProducts } from "@/app/hooks/useOrderProducts";
import OptionButton from "./OptionButton";

interface OrderRowProps {
  order: Order;
}

const getChipColor = (status: string) => {
  switch (status) {
    case "Pendente":
      return "error";
    case "Concluída":
      return "success";
    default:
      return "default";
  }
};

const getOrderFinalPrice = (orderProducts: OrderProduct[]) => {
  const total = orderProducts.reduce((acc, item) => acc + Number(item.total), 0);
  return total.toFixed(2);
};

const OrderRow = ({ order }: OrderRowProps) => {
  const { vendor } = useVendor(order.vendorId);

  const { orderProducts } = useOrderProducts(order.id);

  return (
    <TableRow key={order.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {order.id}
      </TableCell>
      <TableCell align="right">{vendor?.name}</TableCell>
      <TableCell align="right">{formatDate(order.createdAt)}</TableCell>
      <TableCell align="right">{getOrderFinalPrice(orderProducts)}</TableCell>
      <TableCell align="right">
        <Chip label={order.status} color={getChipColor(order.status)} />
      </TableCell>
      <TableCell align="right">
        <OptionButton orderId={order.id} initialStatus={order.status} />
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
