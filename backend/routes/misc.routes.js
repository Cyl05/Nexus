import express from "express";
import { searchQuery } from "../controllers/misc.controller.js";

const router = express.Router();

router.post("/search", searchQuery);

export default router;