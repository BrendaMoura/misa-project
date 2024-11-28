import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { deleteOrder } from "../services/order";
import { useQueryClient } from "@tanstack/react-query";

interface OptionButtonProps {
  orderId: string;
}

const OptionButton = ({ orderId }: OptionButtonProps) => {
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteOrder(orderId);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (error) {
      console.log(error);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="options" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu id="options" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Editar pedido
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Apagar pedido
        </MenuItem>
      </Menu>
    </>
  );
};

export default OptionButton;
