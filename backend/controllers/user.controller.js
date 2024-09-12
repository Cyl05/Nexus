import { db } from "../server.js";
import bcrypt from "bcryptjs";

const saltRounds = 10;

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
		return res.status(404).json({ message: "User not found" });
	}
	// if provided credentials are valid
	const user = response.rows[0];
	const { password: hash, id } = user;
	bcrypt.compare(password, hash, (err, result) => {
		if (err) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log("Error occurred: " + err);
		} else {
			// if password matches
			if (result) {
				req.session.user = user;
				res.json(`Password matches: ${password} ${hash}`);
			}
			// if password does not match
			else {
				res.status(401).json({ message: "Invalid credentials" });
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
					const response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hash]);
					const { id } = response.rows[0];
					req.session.user = { id, username, password };
					res.status(200).json({ isSuccess: true, message: "User registered" });
				}
			})
		}
	} catch (error) {
		res.status(500).json({ isSuccess: false, message: "Internal server error" });
	}
}

async function joinCommunity (req, res) {
	try {
		const communityId = req.params.communityId;
		await db.query("INSERT INTO user_communities (user_id, community_id) VALUES ($1, $2)", [req.session.user.id, communityId]);
		res.status(200).json({message: "Joined community successfully"});
	} catch (error) {
		if (error.detail.includes("already exists")) {
			return res.status(400).json({message: "You are already part of this community"});
		}
		console.log(error);
		res.status(500).json({message: "Internal Server error"});
	}
}

async function showUserCommunities (req, res) {
	try {
		const userId = req.session.user.id;
		const response = await db.query("SELECT tc.name FROM communities tc INNER JOIN user_communities uc ON tc.id = uc.community_id WHERE uc.user_id = $1;", [userId]);
		res.status(200).json({message: "Retrieved communities successfully", data: response.rows});
	} catch (error) {
		console.log(error);
		res.status(500).json({message: "Internal Server Error"});
	}
}

async function getPosts (req, res) {
	try {
		const response = await db.query("SELECT * FROM posts WHERE author_name=$1", [req.session.user.username]);
		return res.status(200).json({message: "Retrieved all posts", data: response.rows});
	} catch (error) {
		console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
	}
}

export { getLogin, getLogout, loginUser, registerUser, joinCommunity, showUserCommunities, getPosts };