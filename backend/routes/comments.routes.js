import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { upvoteComment, downvoteComment, getCommentVoteCount } from "../controllers/comments.controller.js";

const router = express.Router();
router.post("/:commentId/upvote", isAuthenticated, upvoteComment);
router.post("/:commentId/downvote", isAuthenticated, downvoteComment);
router.get("/:commentId/count", getCommentVoteCount);

export default router;