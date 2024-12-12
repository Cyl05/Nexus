import express from "express";
import { insertActivity, searchQuery } from "../controllers/misc.controller.js";
import { isAuthenticated } from "../utils/utils.js";

const router = express.Router();

router.post("/search", searchQuery);
router.post("/insertActivity", isAuthenticated, insertActivity);

export default router;