import express from "express";
import { createCategory, deleteCategory, getCategory, getCategoryId, updateCategory } from "../controllers/Category.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.put("/updateCategory/:id", updateCategory);
router.get("/getCategory", getCategory);
router.delete("/deleteCategory/:id", deleteCategory);
router.get("/getCategoryID/:id", getCategoryId);

export default router