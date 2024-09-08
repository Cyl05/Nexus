import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { createPost, viewPost, upvotePost, downvotePost, getVoteCount } from "../controllers/posts.controller.js";
import { createComment, viewPostComments } from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/:postId", viewPost);
router.post("/create", isAuthenticated, createPost);
router.post("/:postId/upvote", isAuthenticated, upvotePost);
router.post("/:postId/downvote", isAuthenticated, downvotePost);
router.get("/:postId/count", getVoteCount);
router.post("/:postId/comment", isAuthenticated, createComment);
router.get("/:postId/comment", viewPostComments);

export default router;