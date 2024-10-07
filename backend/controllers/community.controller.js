import { db } from "../server.js";
import { getRandomColor } from "../utils/utils.js";

async function getCommunity (req, res) {
    let communityId = req.params.communityId;
    try {
        const response = await db.query("SELECT * FROM communities WHERE id=$1", [communityId]);
        if (response.rows.length === 0) {
            return res.status(404).json({isSuccess: false, message: "Community not found"});
        }
        return res.status(200).json({isSuccess: true, message: "Community found", data: response.rows[0]});
    } catch (error) {
        console.log(error);
        return res.status(500).json({isSuccess: false, message: "Internal Server Error"});
    }
}

async function createCommunity (req, res) {
    let missingValue = false;
    const { name, icon, descTitle, desc, userId, banner } = req.body;
    Object.entries(req.body).map(([key, value]) => {
        if (!value) {
            missingValue = true;
        }
    });
    if (missingValue) {
        return res.status(404).json({message: "Fill all mandatory fields"});
    } else {
        const response = await db.query(
            `INSERT INTO communities (name, icon, description_title, description, created_by, banner)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, icon, descTitle, desc, userId, banner]
        );
        res.status(200).json({isSuccess: true, message: "Community Created Successfully", data: response.rows[0]});
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

async function getCommunitySize(req, res) {
    try {
        const communityId = req.params.communityId;
        const response = await db.query("SELECT COUNT(*) FROM user_communities WHERE community_id=$1", [communityId]);
        res.status(200).json({isSuccess: true, message: "Retrieved community size", data: response.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function checkMembership(req, res) {
    try {
        const userId = req.body.userId;
        const communityId = req.params.communityId;
        const response = await db.query("SELECT * FROM user_communities WHERE user_id = $1 AND community_id = $2", [userId, communityId]);
        if (response.rows[0]) {
            res.status(200).json({isSuccess: true, message: "Is a member", member: true});
        } else {
            res.status(200).json({isSuccess: true, message: "Is not a member", member: false});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function getCommunityPosts(req, res) {
    try {
        const communityId = req.params.communityId;
        const response = await db.query("SELECT * FROM posts WHERE community_id = $1", [communityId]);
        res.status(200).json({isSuccess: true, message: "Retrieved community posts", data: response.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export { getCommunity, createCommunity, editCommunity, deleteCommunity, getCommunitySize, checkMembership, getCommunityPosts };