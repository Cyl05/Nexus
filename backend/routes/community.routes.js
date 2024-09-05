import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { createCommunity, editCommunity, deleteCommunity } from "../controllers/community.controller.js";

const router = express.Router();

router.post("/create", isAuthenticated, createCommunity);
router.put("/:communityId/edit", isAuthenticated, editCommunity);
router.delete("/:communityId/delete", isAuthenticated, deleteCommunity);

export default router;