import express from "express";
import requirementRoutes from "./route/requirement.routes.js";
import errormiddleware from "./middleware/error.middleware.js";
const app = express();


app.use(express.json());
app.use("/api/requirements", requirementRoutes);
app.use(errormiddleware);

export default app;