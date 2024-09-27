import express from "express";
import { isAuthenticated } from "../utils/utils.js";
import { createPost, viewPost, upvotePost, downvotePost, getVoteCount, getVoteState, getNumberComments } from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/:postId", viewPost);
router.post("/create", isAuthenticated, createPost);
router.post("/upvote/:postId", isAuthenticated, upvotePost);
router.post("/downvote/:postId", isAuthenticated, downvotePost);
router.get("/count/:postId", getVoteCount)
router.post("/voteState/:postId", isAuthenticated, getVoteState);
router.get("/commentsCount/:postId", getNumberComments);

export default router;