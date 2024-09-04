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

export { createCommunity };