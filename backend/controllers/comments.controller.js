import { db } from "../server.js";
import { getCount, votePost } from "../utils/utils.js";

async function createComment (req, res) {
    const postId = req.params.postId;
    const { content, userId } = req.body;
    if (!content) {
        return res.status(400).json({ isSuccess: false, message: "Please type some content" });
    }

    try {
        await db.query(
            `INSERT INTO comments (user_id, content, post_id, created_at)
            VALUES ($1, $2, $3, $4)`,
            [userId, content, postId, new Date()]
        );
        return res.status(200).json({ isSuccess: true, message: "Commented successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
    }
}

async function viewPostComments (req, res) {
    const postId = req.params.postId;
    try {
        const response = await db.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
        res.status(200).json({message: "Comments retrieved successfully!", data: response.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function upvoteComment (req, res) {
    const commentId = req.params.commentId;
    const { statusCode, message } = await votePost("comment", commentId, req.session.user.id, true, "Upvote");
    return res.status(statusCode).json({message: message});
}

async function downvoteComment(req, res) {
    const commentId = req.params.commentId;
    const { statusCode, message } = await votePost("comment", commentId, req.session.user.id, false, "Downvote");
    return res.status(statusCode).json({message: message});
}

async function getCommentVoteCount(req, res) {
    const commentId = req.params.commentId;
    const response = await getCount("comment", commentId);
    if (!response.data) {
        res.status(response.statusCode).json({message: response.message});
    } else {
        res.status(response.statusCode).json({upvote_count: response.data});
    }
}

export { createComment, viewPostComments, upvoteComment, downvoteComment, getCommentVoteCount }