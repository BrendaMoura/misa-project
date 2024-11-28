import { Router } from "express";
import vendorController from "./vendor.controller";

const router = Router();

router.get("/", vendorController.index);
router.get("/:id", vendorController.read);

export default router;
