import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  createOrder,
  deleteOrder,
  listOrderProducts,
  listOrders,
  readOrder,
  updateOrder,
} from "./order.service";
import { CreateOrderDto, UpdateOrderDto } from "./order.types";

const index = async (req: Request, res: Response) => {
  try {
    const orders = await listOrders();
    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const orderProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await listOrderProducts(id);
    if (!order) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(order);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const order = req.body as CreateOrderDto;
  try {
    const newOrder = await createOrder(order);
    res.status(StatusCodes.OK).json(newOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await readOrder(id);
    if (!order) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(order);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedOrder = req.body as UpdateOrderDto;

  try {
    const order = await updateOrder(id, updatedOrder);

    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Pedido não encontrado" });
    }

    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro ao atualizar o pedido", error });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedOrder = await deleteOrder(id);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, orderProducts, create, read, update, remove };
