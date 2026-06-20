import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

dotenv.config({ path: ".env" });

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Security Middlewares
app.use(helmet());

// Data Sanitization against NoSQL query injection
// Custom sanitization for Express 5 compatibility
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  for (const key in obj) {
    if (key.includes('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      sanitizeObject(obj[key]);
    }
  }
};
app.use((req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
});

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000,
  message: { message: "Too many requests, please try again later." },
});

app.use("/api", globalLimiter);

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

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});
