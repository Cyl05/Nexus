import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { createCommunity } from "../controllers/community.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, createCommunity);

export default router;