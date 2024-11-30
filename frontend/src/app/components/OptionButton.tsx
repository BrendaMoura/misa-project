import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useEffect, useState } from "react";
import { deleteOrder, updateOrder } from "../services/order";
import { useQueryClient } from "@tanstack/react-query";

interface OptionButtonProps {
  orderId: string;
  initialStatus: string;
}

const OptionButton = ({ orderId, initialStatus }: OptionButtonProps) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(initialStatus);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
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

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    try {
      const updatedOrder = await updateOrder(orderId, status);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setStatus("");
      setAnchorEl(null);
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton aria-label="options" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu id="options" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClickOpenModal}>
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

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Editar pedido</DialogTitle>
        <DialogContent>
          <Select
            label="status"
            displayEmpty
            value={status}
            onChange={handleStatusChange}
            sx={{ width: "300px" }}
          >
            <MenuItem value="" disabled>
              Selecione um status
            </MenuItem>
            <MenuItem value={"Pendente"}>Pendente</MenuItem>
            <MenuItem value={"Em andamento"}>Em Andamento</MenuItem>
            <MenuItem value={"Concluída"}>Concluída</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveStatus} sx={{ textTransform: "none" }}>
            Salvar status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OptionButton;
