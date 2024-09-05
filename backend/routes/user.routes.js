import express from "express";
import { getLogin, getLogout, loginUser, registerUser, joinCommunity, showUserCommunities } from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/utils.js";

const router = express.Router();

// configuring of routes
router.get("/login", getLogin);
router.get("/logout", getLogout);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/join/:communityId", isAuthenticated, joinCommunity);
router.get("/communities", isAuthenticated, showUserCommunities);

export default router;