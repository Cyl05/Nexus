import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { createComment, upvoteComment, downvoteComment, getCommentVoteCount, viewPostComments } from "../controllers/comments.controller.js";

const router = express.Router();

router.get("list/:postId", viewPostComments);
router.get("/count/:commentId", getCommentVoteCount);
router.post("/create/:postId", isAuthenticated, createComment);
router.post("/upvote/:commentId", isAuthenticated, upvoteComment);
router.post("/downvote/:commentId", isAuthenticated, downvoteComment);

export default router;