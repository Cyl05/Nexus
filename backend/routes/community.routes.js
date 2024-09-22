import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { getCommunity, createCommunity, editCommunity, deleteCommunity, getCommunitySize, checkMembership } from "../controllers/community.controller.js";

const router = express.Router();

router.get("/getCommunity/:communityId", getCommunity);
router.post("/create", isAuthenticated, createCommunity);
router.put("/editCommunity/:communityId", isAuthenticated, editCommunity);
router.delete("/deleteCommunity/:communityId", isAuthenticated, deleteCommunity);
router.get("/getCommunitySize/:communityId", getCommunitySize);
router.post("/checkMembership/:communityId", isAuthenticated, checkMembership);

export default router;