import express from "express";
import {
    getLogin,
    getLogout,
    loginUser,
    changePassword,
    registerUser,
    joinCommunity,
    leaveCommunity,
    showUserCommunities,
    getPosts,
    getComments,
    getSavedPosts,
    getUser,
    refreshToken,
    saveUnsavePost,
    savePostStatus,
    editUser,
    deleteUser
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/utils.js";

const router = express.Router();

// configuring of routes
router.get("/getUser/:userId", getUser);
router.get("/login", getLogin);
router.get("/logout", getLogout);
router.get("/posts/:userId", getPosts);
router.get("/comments/:userId", getComments);
router.get("/savedposts/:userId", getSavedPosts);
router.get("/savestatus/:postId/:userId", savePostStatus);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/changepassword/:userId", isAuthenticated, changePassword);
router.post("/join/:communityId", isAuthenticated, joinCommunity);
router.post("/leave/:communityId", isAuthenticated, leaveCommunity);
router.post("/communities", isAuthenticated, showUserCommunities);
router.post("/refreshToken", refreshToken);
router.post("/save/:postId", isAuthenticated, saveUnsavePost);
router.post("/edit/:userId", isAuthenticated, editUser);
router.post("/delete/:userId", isAuthenticated, deleteUser);

export default router;