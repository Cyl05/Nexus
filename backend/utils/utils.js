import { db } from "../server.js";
import env from "dotenv";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

env.config({
  path: `${__dirname}/../../.env`
});

function createAccessToken(userId) {
    const payload = {
        userId: userId,
        exp: Math.floor(Date.now() / 1000) + (60), // expires in 1 hour
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}

function createRefreshToken(userId) {
    const payload = {
        userId: userId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // expires in 30 days
      };
      return jwt.sign(payload, process.env.JWT_SECRET);
}

async function refreshAccessToken(refreshToken) {
    try {
        const { userId } = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const response = await db.query("SELECT * FROM users WHERE id=$1", [userId]);
        if (response.rows.length === 0) {
            // return res.status(404).json({isSuccess: false, message: "User not found"});
            return null;
        } else {
            const accessToken = createAccessToken(userId);
            // return res.status(200).json({isSuccess: true, message: "Generated access token", token: accessToken});
            return accessToken;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({isSuccess: false, message: "Internal Server Error"});
    }
}

function isAuthenticated(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.redirect("/user/login");
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({isSuccess: false, message: "Failed to authenticate"});
            } else {
                res.locals.authData = decoded;
                next();
            }
        })
    }
}

async function votePost (voteArea, areaId, userId, voteBoolean, voteType) {
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

async function getCount (voteArea, areaId) {
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

function getRandomColor () {
    const pastelColors = [
        "#FFD1DC",
        "#B5E0CD",
        "#F2B4C9",
        "#E5C3D7",
        "#F6E3C3",
        "#B0D4B5",
        "#F4D1D8",
        "#D9E6B9",
        "#E8C8D7",
        "#B9E6D2"
    ];
    return Math.floor(Math.random() * pastelColors.length);
}

export { createAccessToken, createRefreshToken, refreshAccessToken, isAuthenticated, votePost, getCount, getRandomColor };