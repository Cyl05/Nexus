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
        const response = await db.query(`SELECT * FROM ${voteArea}_votes WHERE ${voteArea}_id=$1 AND user_id=$2`, [areaId, userId]);
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

export async function getCount (voteArea, areaId) {
    try {
        const result = await db.query(
            `SELECT
                COALESCE(SUM(CASE WHEN v.vote_type THEN 1 ELSE -1 END), 0) AS vote_count
            FROM ${voteArea}s p
            LEFT JOIN ${voteArea}_votes v ON p.id = v.${voteArea}_id
            WHERE p.id = $1
            GROUP BY p.id`,
            [areaId]
        );

        console.log(result.rows);
        
        if (result.rows.length === 0) {
            return {statusCode: 404, message: `${voteArea} not found`};
        }

        const voteCount = result.rows[0].vote_count;
        // res.status(200).json({ data: { vote_count: voteCount } });
        return {statusCode: 200, data: voteCount};
    } catch (error) {
        console.error(error);
        return {statusCode: 500, message: `Internal Server Error`};
    }
}