import { db } from "../server.js";

async function createComment (req, res) {
    const postId = req.params.postId;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: "Please type some content" });
    }

    try {
        await db.query(
            `INSERT INTO comments (user_id, content, post_id, created_at)
            VALUES ($1, $2, $3, $4)`,
            [req.session.user.id, content, postId, new Date()]
        );
        return res.status(200).json({ message: "Commented successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
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

export { createComment, viewPostComments }