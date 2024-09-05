import { db } from "../server.js";

async function createCommunity(req, res) {
    let missingValue = false;
    Object.entries(req.body).map(([key, value]) => {
        if (!value) {
            missingValue = true;
        }
    });
    if (missingValue) {
        return res.status(404).json({message: "Fill all mandatory fields"});
    } else {
        await db.query("INSERT INTO test_communities (name, created_by) VALUES ($1, $2)", [req.body.name, req.session.user.username]);
        res.json(Object.entries(req.body));
    }
}

async function editCommunity (req, res) {
    try {
        const communityId = req.params.communityId;
        const newName = req.body.name;
        const response = await db.query("UPDATE test_communities SET name=$1, edited_at=$2 WHERE id=$3 RETURNING *", [newName, new Date(), communityId]);
        res.status(200).json({message: "Updated community", data: response.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function deleteCommunity (req, res) {
    try {
        const communityId = req.params.communityId;
        await db.query("DELETE FROM test_communities WHERE id=$1", [communityId]);
        res.status(200).json({message: "Community deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export { createCommunity, editCommunity, deleteCommunity };