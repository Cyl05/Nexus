import express from "express";
import {
    getLogin,
    getLogout,
    loginUser,
    registerUser,
    joinCommunity,
    leaveCommunity,
    showUserCommunities,
    getPosts,
    getComments,
    getUser,
    refreshToken
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/utils.js";

const router = express.Router();

// configuring of routes
router.get("/getUser/:userId", getUser);
router.get("/login", getLogin);
router.get("/logout", getLogout);
router.get("/posts/:userId", getPosts);
router.get("/comments/:userId", getComments);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/join/:communityId", isAuthenticated, joinCommunity);
router.post("/leave/:communityId", isAuthenticated, leaveCommunity);
router.post("/communities", isAuthenticated, showUserCommunities);
router.post("/refreshToken", refreshToken);

export default router;