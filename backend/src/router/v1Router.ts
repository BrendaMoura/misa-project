import { Router } from "express";
import orderRouter from "../resources/order/order.router";
import vendorRouter from "../resources/vendor/vendor.router";
import productRouter from "../resources/product/product.router";

const router = Router();

router.use("/orders", orderRouter);
router.use("/vendors", vendorRouter);
router.use("/products", productRouter);

export default router;
