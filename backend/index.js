import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

import userRoutes from "./routes/user.route.js";
import serviceRoutes from "./routes/service.route.js";
import customerRoutes from "./routes/customer.route.js";
import orderRoutes from "./routes/order.route.js";
import authRoutes from "./routes/auth.route.js";
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", serviceRoutes);
app.use("/api/v1", customerRoutes);
app.use("/api/v1", orderRoutes);
