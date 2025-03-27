import express from "express";
import { createProduct } from "../controller/product.controller.js";
import { getProducts } from "../controller/product.controller.js";
import { updatedProduct } from "../controller/product.controller.js";
import { deleteProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.delete("/:id",deleteProduct);

router.put("/:id", updatedProduct);

export default router;