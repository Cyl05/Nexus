import { db } from "../server.js";
import { votePost, getCount } from "../utils/utils.js";

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
    const response = await getCount("post", postId);
    if (!response.data) {
        res.status(response.statusCode).json({message: response.message});
    } else {
        res.status(response.statusCode).json({upvote_count: response.data});
    }
}


export { createPost, viewPost, upvotePost, downvotePost, getVoteCount }