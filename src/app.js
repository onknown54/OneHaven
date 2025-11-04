import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
