import { db } from "../server.js";

async function createCommunity(req, res) {
    let missingValue = false;
    const { name, icon, descTitle, desc } = req.body;
    Object.entries(req.body).map(([key, value]) => {
        if (!value) {
            missingValue = true;
        }
    });
    if (missingValue) {
        return res.status(404).json({message: "Fill all mandatory fields"});
    } else {
        await db.query(
            `INSERT INTO communities (name, icon, description_title, description, created_by)
            VALUES ($1, $2, $3, $4, $5)`,
            [name, icon, descTitle, desc, req.session.user.id]
        );
        res.json(Object.entries(req.body));
    }
}

async function editCommunity (req, res) {
    try {
        const communityId = req.params.communityId;
        const { name, icon, descTitle, desc } = req.body.name;
        const response = await db.query(
            `UPDATE communities SET 
            name=$1, icon=$2, description_title=$3, description=$4, edited_at=$5, 
            WHERE id=$6 RETURNING *`,
            [name, icon, descTitle, desc, new Date(), communityId]
        );
        res.status(200).json({message: "Updated community", data: response.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function deleteCommunity (req, res) {
    try {
        const communityId = req.params.communityId;
        await db.query("DELETE FROM communities WHERE id=$1", [communityId]);
        res.status(200).json({message: "Community deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export { createCommunity, editCommunity, deleteCommunity };