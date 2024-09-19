import express from "express";
import { getLogin, getLogout, loginUser, registerUser, joinCommunity, showUserCommunities, getPosts, getUser, refreshToken } from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/utils.js";

const router = express.Router();

// configuring of routes
router.get("/getUser/:userId", getUser);
router.get("/login", getLogin);
router.get("/logout", getLogout);
router.get("/posts", isAuthenticated, getPosts);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/join/:communityId", isAuthenticated, joinCommunity);
router.post("/communities", isAuthenticated, showUserCommunities);
router.post("/refreshToken", refreshToken);

export default router;