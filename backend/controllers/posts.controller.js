import { db } from "../server.js";
import { votePost } from "../utils/utils.js";

async function createPost(req, res) {
    const { postTitle, postContent, image, communityId } = req.body;
    if (!postTitle, !postContent, !communityId) {
        return res.status(400).json({ message: "Please provide all mandatory fields" });
    }
    try {
        await db.query(
            `INSERT INTO posts (post_title, post_content, image, author_name, community_id, posted_at)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [postTitle, postContent, image, req.session.user.username, communityId, new Date()]
        );
        return res.status(200).json({ message: "Post created successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function viewPost(req, res) {
    const postId = req.params.postId;
    try {
        const response = await db.query("SELECT * FROM posts WHERE id=$1", [postId]);
        res.status(200).json({ message: "Post retrieved", data: response.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function upvotePost(req, res) {
    const postId = req.params.postId;
    const { statusCode, message } = await votePost("post", postId, req.session.user.id, true, "Upvote");
    return res.status(statusCode).json({message: message});
}

async function downvotePost(req, res) {
    const postId = req.params.postId;
    const { statusCode, message } = await votePost("post", postId, req.session.user.id, false, "Downvote");
    return res.status(statusCode).json({message: message});
}

async function getVoteCount(req, res) {
    const { postId } = req.params;
    
    try {
        const result = await db.query(
            `SELECT
                COALESCE(SUM(CASE WHEN v.vote_type THEN 1 ELSE -1 END), 0) AS upvote_count
            FROM posts p
            LEFT JOIN post_votes v ON p.id = v.post_id
            WHERE p.id = $1
            GROUP BY p.id`,
            [postId]
        );

        console.log(result.rows);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        const voteCount = result.rows[0].upvote_count;
        res.status(200).json({ data: { upvote_count: voteCount } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export { createPost, viewPost, upvotePost, downvotePost, getVoteCount }