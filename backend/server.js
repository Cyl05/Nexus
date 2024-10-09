import express from "express";
import env from "dotenv";
import session from "express-session";
import routes from "./routes/main.routes.js";
import connectDB from "./database/db.config.js";
import cors from "cors";
import { isAuthenticated } from "./utils/utils.js";
import jwt from "jsonwebtoken";

env.config();
const app = express();
const port = process.env.PORT || 3000;
export const db = connectDB();

// configuring of sessions middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", routes);

app.post('/getSession', isAuthenticated, (req, res) => {
    // res.json(req.session.user);
    const accessToken = req.body.accessToken;
    const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);
    res.json({userId: userId});
});

app.listen(port, () => {
    console.log(`The server is listening on http://localhost:${port}`);
});