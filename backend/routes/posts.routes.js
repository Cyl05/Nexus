import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { createPost, viewPost, upvotePost, downvotePost, getVoteCount } from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/:postId", viewPost);
router.post("/create", isAuthenticated, createPost);
router.post("/:postId/upvote", isAuthenticated, upvotePost);
router.post("/:postId/downvote", isAuthenticated, downvotePost);
router.get("/:postId/count", getVoteCount);

export default router;