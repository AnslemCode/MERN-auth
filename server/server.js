import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoose.config.js";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
