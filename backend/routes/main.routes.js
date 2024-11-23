import express from "express";
import userRoutes from "./user.routes.js";
import communityRoutes from "./community.routes.js";
import postRoutes from "./posts.routes.js";
import commentRoutes from "./comments.routes.js";
import miscRoutes from "./misc.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/community", communityRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/misc", miscRoutes);

export default router;