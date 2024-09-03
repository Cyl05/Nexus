import express from "express";
import env from "dotenv";
import bcrypt from "bcryptjs";
import session from "express-session";
import connectDB from "./database/db.config.js";

env.config();
const app = express();
const port = process.env.PORT || 3000;

const db = connectDB();
const saltRounds = 10;

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get("/", async (req, res) => {
    const response = await db.query("SELECT * FROM users");
    res.json(response.rows);
});

app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome, ${req.session.user.username}!`);
});

app.get("/user/login", (req, res) => {
    res.json("Login ra");
});

app.get('/user/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/login');
    });
});

app.post("/user/login", async (req, res) => {
    const {username, password} = req.body;
    const response = await db.query("SELECT * FROM users WHERE username=$1", [username]);
    
    // if invalid username is given
    if (response.rows.length === 0) {
        res.status(404).json({message: "User not found"});
    }
    // if provided credentials are valid
    else {
        const {password: hash, id} = response.rows[0];
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                res.status(500).json({message: "Internal Server Error"});
                console.log("Error occurred: " + err);
            } else {
                // if password matches
                if (result) {
                    req.session.user = { id, username, password };
                    res.json(`Password matches: ${password} ${hash}`);
                }
                // if password does not match
                else {
                    res.status(401).json({message: "Invalid credentials"});
                }
            }
        });
    }
});

app.post("/user/register", async (req, res) => {
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
                    const {id} = response.rows[0];
                    req.session.user = { id, username, password };
                    res.status(200).json({message: "User registered"});
                }
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`The server is listening on http://localhost:${port}`);
});