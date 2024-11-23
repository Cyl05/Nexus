import { db } from "../server.js";

async function searchQuery(req, res) {
    const { query } = req.body;
    try {
        const response = await db.query(`SELECT * FROM communities WHERE name like '%${query}%'`);
        return res.status(200).json({isSuccess: true, message: "Retrieved communities", data: response.rows});
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }
}

export { searchQuery }