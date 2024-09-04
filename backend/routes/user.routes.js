import express from "express";
import {getLogin, getLogout, loginUser, registerUser} from "../controllers/user.controller.js";

const router = express.Router();

// configuring of routes
router.get("/login", getLogin);
router.get("/logout", getLogout);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;