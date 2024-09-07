import { db } from "../server.js";

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
    try {
        const response = await db.query("SELECT * FROM votes WHERE post_id=$1 AND user_id=$2 AND vote_type=$3", [postId, req.session.user.id, false]);
        if (response.rows.length !== 0) {
            await db.query("UPDATE votes SET vote_type=$1 WHERE post_id=$2 AND user_id=$3", [postId, req.session.user.id, true]);
            return res.status(200).json({ message: "Upvote successful" });
        }
        await db.query(
            "INSERT INTO votes (post_id, user_id, vote_type, created_at) VALUES ($1, $2, $3, $4)",
            [postId, req.session.user.id, true, new Date()],
        )
        res.status(200).json({ message: "Upvote successful" });
    } catch (error) {
        console.log(error);
        if (error.detail.includes("already")) {
            await db.query("DELETE FROM votes WHERE post_id=$1 AND user_id=$2", [postId, req.session.user.id]);
            return res.status(200).json({ message: "Upvote removed" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function downvotePost(req, res) {
    const postId = req.params.postId;
    try {
        const response = await db.query("SELECT * FROM votes WHERE post_id=$1 AND user_id=$2 AND vote_type=$3", [postId, req.session.user.id, true]);
        if (response.rows.length !== 0) {
            await db.query("UPDATE votes SET vote_type=$1 WHERE post_id=$2 AND user_id=$3", [false, postId, req.session.user.id]);
            return res.status(200).json({ message: "Downvote successful" });
        }
        await db.query(
            "INSERT INTO votes (post_id, user_id, vote_type, created_at) VALUES ($1, $2, $3, $4)",
            [postId, req.session.user.id, false, new Date()],
        )
        res.status(200).json({ message: "Downvote successful" });
    } catch (error) {
        console.log(error);
        if (error.detail.includes("already")) {
            await db.query("DELETE FROM votes WHERE post_id=$1 AND user_id=$2", [postId, req.session.user.id]);
            return res.status(200).json({ message: "Downvote removed" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getVoteCount(req, res) {
    const { postId } = req.params;
    
    try {
        const result = await db.query(
            `SELECT
                COALESCE(SUM(CASE WHEN v.vote_type THEN 1 ELSE -1 END), 0) AS upvote_count
            FROM posts p
            LEFT JOIN votes v ON p.id = v.post_id
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