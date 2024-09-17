import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { getCommunity, createCommunity, editCommunity, deleteCommunity } from "../controllers/community.controller.js";

const router = express.Router();

router.get("/getCommunity/:communityId", getCommunity);
router.post("/create", isAuthenticated, createCommunity);
router.put("/editCommunity/:communityId", isAuthenticated, editCommunity);
router.delete("/deleteCommunity/:communityId", isAuthenticated, deleteCommunity);

export default router;