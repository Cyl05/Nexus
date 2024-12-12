import { db } from "../server.js";

async function searchQuery(req, res) {
    const { query } = req.body;
    try {
        const response = await db.query(`SELECT * FROM communities WHERE name ILIKE '%${query}%'`);
        return res.status(200).json({ isSuccess: true, message: "Retrieved communities", data: response.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}

async function insertActivity (req, res) {
    const { userId, communityId, postId, intType } = req.body;
    console.log(communityId);
    if (intType === "upvote") {
        try {
            const fetchResponse = await db.query(
                "SELECT * FROM user_activity WHERE user_id = $1 AND community_id = $2 AND post_id = $3 AND interaction_type = $4",
                [userId, communityId, postId, intType]
            );
            if (fetchResponse.rows.length > 0) {
                const deleteResponse = await db.query(
                    "DELETE FROM user_activity WHERE user_id = $1 AND community_id = $2 AND post_id = $3 AND interaction_type = $4",
                    [userId, communityId, postId, intType]
                )
                return res.status(200).json({ isSuccess: true, message: "Removed upvote", data: deleteResponse.rows[0] });
            }
        } catch (error) {
            return res.status(500).json({isSuccess: false, message: "Internal Server Error"});
        }
    }
    try {
        const response = await db.query(
            `INSERT INTO user_activity (user_id, community_id, post_id, interaction_type) VALUES ($1, $2, $3, $4) RETURNING *`,
            [userId, communityId, postId, 'upvote']
        );
        return res.status(200).json({ isSuccess: true, message: "Inserted activity", data: response.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({isSuccess: false, message: "Internal Server Error"});
    }
}

export { searchQuery, insertActivity }