import express from "express";
import {logout, login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login-web", login)
router.post("/login-admin", login)
router.post("/logout", logout)

export default router