import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { listVendors, readVendor } from "./vendor.service";

const index = async (req: Request, res: Response) => {
  try {
    const vendors = await listVendors();
    res.status(StatusCodes.OK).json(vendors);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vendor = await readVendor(id);
    if (!vendor) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(vendor);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, read };
