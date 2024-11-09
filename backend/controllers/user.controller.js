import { db } from "../server.js";
import bcrypt from "bcryptjs";
import env from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createAccessToken, createRefreshToken, refreshAccessToken } from "../utils/utils.js";

const saltRounds = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

env.config({
	path: `${__dirname}/../../.env`
});

async function getUser(req, res) {
	const id = req.params.userId;
	try {
		const response = await db.query("SELECT * FROM users WHERE id=$1", [id]);
		if (response.rows.length === 0) {
			return res.status(404).json({ isSuccess: false, message: "User not found" });
		}
		return res.status(200).json({ isSuccess: true, message: "User found", data: response.rows[0] });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
	}
}

function getLogin(req, res) {
	res.json("Login ra");
}

function getLogout(req, res) {
	req.session.destroy((err) => {
		if (err) {
			console.error(err);
		}
		res.redirect('/user/login');
	});
}

async function loginUser(req, res) {
	const { username, password } = req.body;
	const response = await db.query("SELECT * FROM users WHERE username=$1", [username]);

	// if invalid username is given
	if (response.rows.length === 0) {
		return res.status(404).json({ isSuccess: false, message: "User not found" });
	}
	// if provided credentials are valid
	const user = response.rows[0];
	const { password: hash, id } = user;
	bcrypt.compare(password, hash, (err, result) => {
		if (err) {
			res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
			console.log("Error occurred: " + err);
		} else {
			// if password matches
			if (result) {
				const accessToken = createAccessToken(id);
				const refreshToken = createRefreshToken(id);

				res.status(200).json({ isSuccess: true, message: "Logging in...", accessToken: accessToken, refreshToken: refreshToken });
			}
			// if password does not match
			else {
				res.status(401).json({ isSuccess: false, message: "Password mismatch" });
			}
		}
	});
}

async function registerUser(req, res) {
	const { username, password } = req.body;
	try {
		const response = await db.query("SELECT * FROM users WHERE username=$1", [username]);
		// if account already exists with same username
		if (response.rows.length > 0) {
			res.status(500).json({ isSuccess: false, message: "Username already exists" });
		} else {
			bcrypt.hash(password, saltRounds, async (err, hash) => {
				if (err) {
					console.log(err);
					res.status(500).json({ message: "Internal server error" });
				} else {
					const response = await db.query(
						"INSERT INTO users (username, password, bio, display_name) VALUES ($1, $2, $3) RETURNING *",
						[username, hash, `Hi, I am ${username}`, username]
					);
					const user = response.rows[0];
					const { id } = user;

					const accessToken = createAccessToken(id);
					const refreshToken = createRefreshToken(id);

					res.status(200).json({ isSuccess: true, message: "User registered", accessToken: accessToken, refreshToken: refreshToken });
				}
			})
		}
	} catch (error) {
		res.status(500).json({ isSuccess: false, message: "Internal server error" });
	}
}

async function joinCommunity(req, res) {
	try {
		const communityId = req.params.communityId;
		const userId = req.body.userId;
		await db.query("INSERT INTO user_communities (user_id, community_id) VALUES ($1, $2)", [userId, communityId]);
		res.status(200).json({ message: "Joined community successfully" });
	} catch (error) {
		if (error.detail.includes("already exists")) {
			return res.status(400).json({ message: "You are already part of this community" });
		}
		console.log(error);
		res.status(500).json({ message: "Internal Server error" });
	}
}

async function leaveCommunity(req, res) {
	try {
		const communityId = req.params.communityId;
		const userId = req.body.userId;
		await db.query("DELETE FROM user_communities WHERE user_id = $1 AND community_id = $2", [userId, communityId]);
		res.status(200).json({ message: "Left community successfully" });
	} catch (error) {
		if (error.detail.includes("already exists")) {
			return res.status(400).json({ message: "You are already part of this community" });
		}
		console.log(error);
		res.status(500).json({ message: "Internal Server error" });
	}
}

async function showUserCommunities(req, res) {
	try {
		const userId = req.body.userId;
		const response = await db.query("SELECT c.id, c.name, c.icon FROM communities c INNER JOIN user_communities uc ON c.id = uc.community_id WHERE uc.user_id = $1;", [userId]);
		res.status(200).json({ message: "Retrieved communities successfully", data: response.rows });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function getPosts(req, res) {
	const { userId } = req.params;
	try {
		const response = await db.query("SELECT * FROM posts WHERE author_id=$1", [userId]);
		return res.status(200).json({ isSuccess: true, message: "Retrieved all posts", data: response.rows });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
	}
}

async function getComments(req, res) {
	const { userId } = req.params;
	try {
		const response = await db.query("SELECT * FROM comments WHERE user_id=$1", [userId]);
		return res.status(200).json({ isSuccess: true, message: "Retrieved all comments", data: response.rows });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
	}
}

async function getSavedPosts(req, res) {
	const { userId } = req.params;
	try {
		const response = await db.query(
			"SELECT s.post_id, p.* FROM saved_posts s JOIN posts p ON s.post_id = p.id WHERE s.user_id = $1", 
			[userId]
		);
		res.status(200).json({isSuccess: true, message: "Retrieved saved posts", data: response.rows});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
	}
}

async function refreshToken(req, res) {
	const { refreshToken } = req.body;

	try {
		const newAccessToken = await refreshAccessToken(refreshToken);
		if (newAccessToken) {
			res.json({ accessToken: newAccessToken });
		} else {
			res.status(401).json({ isSuccess: false, message: "Failed to fetch user" });
		}
	} catch (err) {
		res.status(401).json({ error: 'Failed to refresh token' });
	}
}

async function saveUnsavePost(req, res) {
	const { postId } = req.params;
	const { userId } = req.body;
	console.log(req.body);
	try {
		const response = await db.query("SELECT * FROM saved_posts WHERE post_id=$1 AND user_id=$2", [postId, userId]);
		if (response.rows.length !== 0) {
			await db.query("DELETE FROM saved_posts WHERE post_id=$1 AND user_id=$2", [postId, userId]);
			res.status(200).json({isSuccess: true, message: "Post Unsaved", data: false});
		} else {
			await db.query("INSERT INTO saved_posts (post_id, user_id) VALUES ($1, $2)", [postId, userId]);
			res.status(200).json({isSuccess: true, message: "Post Saved", data: true});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
	}
}

async function savePostStatus (req, res) {
	const { userId, postId } = req.params;
	try {
		const response = await db.query("SELECT * FROM saved_posts WHERE user_id=$1 AND post_id=$2", [userId, postId]);
		if (response.rows.length !== 0) {
			res.status(200).json({isSuccess: true, message: "Post is saved", data: true});
		} else {
			res.status(200).json({isSuccess: true, message: "Post is not saved", data: false});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
	}
}

async function editUser(req, res) {
	const { userId } = req.params;
	const { user } = req.body;
	try {
		const response = await db.query(
			`UPDATE users
			SET display_name=$1, profile_picture=$2, username=$3, bio=$4
			WHERE id=$5 RETURNING *`,
			[user.display_name, user.profile_picture, user.username, user.bio, userId]
		);
		return res.status(200).json({isSuccess: true, message: "Saved changes successfully", data: response.rows[0]});
	} catch (error) {
		console.log(error);
		return res.status(500).json({isSuccess: false, message: "Internal Server Error"});
	}
}

export {
	getUser,
	getLogin,
	getLogout,
	loginUser,
	registerUser,
	joinCommunity,
	leaveCommunity,
	showUserCommunities,
	getPosts,
	getComments,
	getSavedPosts,
	refreshToken,
	saveUnsavePost,
	savePostStatus,
	editUser
};