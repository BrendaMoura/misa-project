import { Router } from "express";
import orderController from "./order.controller";

const router = Router();

router.get("/", orderController.index);
router.get("/products/:id", orderController.orderProducts);
router.post("/", orderController.create);
router.get("/:id", orderController.read);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.remove);

export default router;
