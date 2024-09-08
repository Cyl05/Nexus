import { db } from "../server.js";

export function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/user/login');
    }
}

export async function votePost (voteArea, areaId, userId, voteBoolean, voteType) {
    try {
        const response = await db.query(`SELECT * FROM ${voteArea}_votes WHERE post_id=$1 AND user_id=$2`, [areaId, userId]);
        if (response.rows.length !== 0 && response.rows[0].vote_type === !voteBoolean) {
            await db.query(`UPDATE ${voteArea}_votes SET vote_type=$3 WHERE ${voteArea}_id=$1 AND user_id=$2`, [areaId, userId, voteBoolean]);
            return { statusCode: 200, message: `${voteType} successful` };
        }
        await db.query(
            `INSERT INTO ${voteArea}_votes (${voteArea}_id, user_id, vote_type, created_at) VALUES ($1, $2, $3, $4)`,
            [areaId, userId, voteBoolean, new Date()],
        )
        return { statusCode: 200, message: `${voteType} successful` };
    } catch (error) {
        if (error.code === "23505") {
            await db.query(`DELETE FROM ${voteArea}_votes WHERE ${voteArea}_id=$1 AND user_id=$2`, [areaId, userId]);
            return { statusCode: 200, message: `${voteType} removed` };
        }
        console.log(error);
        return { statusCode: 500, message: "Internal Server Error" };
    }
}