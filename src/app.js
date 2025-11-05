import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import careGiverRoutes from "./routes/careGiver.route.js";
import protectedMembersRoute from "./routes/protectedMember.route.js";
import { healthCheck, notFound } from "./controllers/common.controller.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(morgan("combined"));
app.use(express.json());

app.get("/api/health", healthCheck);
app.use("/api/caregivers", careGiverRoutes);
app.use("/api/protected-members", protectedMembersRoute);

app.use(notFound);
app.use(errorHandler);

export default app;
