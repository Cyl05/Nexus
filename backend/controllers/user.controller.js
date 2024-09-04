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
		res.redirect('/login');
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
	const { password: hash, id } = response.rows[0];
	bcrypt.compare(password, hash, (err, result) => {
		if (err) {
			res.status(500).json({ message: "Internal Server Error" });
			console.log("Error occurred: " + err);
		} else {
			// if password matches
			if (result) {
				req.session.user = { id, username, password };
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
			res.status(500).json({ message: "Username already exists" });
		} else {
			bcrypt.hash(password, saltRounds, async (err, hash) => {
				if (err) {
					console.log(err);
					res.status(500).json({ message: "Internal server error" });
				} else {
					const response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, hash]);
					const { id } = response.rows[0];
					req.session.user = { id, username, password };
					res.status(200).json({ message: "User registered" });
				}
			})
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}

export { getLogin, getLogout, loginUser, registerUser };