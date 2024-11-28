import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { listProducts, readProduct } from "./product.service";

const index = async (req: Request, res: Response) => {
  try {
    const products = await listProducts();
    res.status(StatusCodes.OK).json(products);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await readProduct(id);
    if (!product) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, read };
