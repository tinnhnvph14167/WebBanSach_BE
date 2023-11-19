import express from "express";
import { createProducts, deleteProducts, getProducts, getProductsId, updateProducts } from "../controllers/Products.js";

const router = express.Router();

router.post("/createProducts", createProducts);
router.put("/updateProducts/:id", updateProducts);
router.get("/getProducts", getProducts);
router.delete("/deleteProducts/:id", deleteProducts);
router.get("/getProductsID/:id", getProductsId);

export default router