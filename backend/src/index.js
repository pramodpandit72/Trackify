import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./db/index.js";

import trainerRoutes from "./routes/trainer.routes.js";
import bookSessionRoutes from "./routes/bookSession.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import jobRoutes from "./routes/job.routes.js";
import exerciseRoutes from "./routes/exercise.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import debugRoutes from "./routes/debug.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// health
app.get("/", (req, res) => {
  res.json({ message: "Trackify backend is running" });
});

// Debug endpoint to check users (remove in production)
app.get("/debug/users", async (req, res) => {
  try {
    const User = (await import("./models/user.model.js")).default;
    const users = await User.find({}, { email: 1, firstName: 1, lastName: 1, role: 1 });
    res.json({ 
      message: `Found ${users.length} user(s)`,
      users 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/trainers", bookSessionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/debug", debugRoutes);

// error handler (should be last)
app.use(errorHandler);

// connect db then start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
