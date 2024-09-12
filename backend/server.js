import express from "express";
import env from "dotenv";
import session from "express-session";
import userRoutes from "./routes/user.routes.js";
import communityRoutes from "./routes/community.routes.js";
import postRoutes from "./routes/posts.routes.js";
import commentRoutes from "./routes/comments.routes.js";
import { isAuthenticated } from "./utils/utils.js";
import connectDB from "./database/db.config.js";
import cors from "cors";

env.config();
const app = express();
const port = process.env.PORT || 3000;
export const db = connectDB();

// configuring of sessions middleware
app.use(cors());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/user", userRoutes);
app.use("/community", communityRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.get("/", async (req, res) => {
    const response = await db.query("SELECT * FROM users");
    res.json(response.rows);
});

app.get('/getSession', (req, res) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.json({message: "Login required"});
    }
});

app.listen(port, () => {
    console.log(`The server is listening on http://localhost:${port}`);
});