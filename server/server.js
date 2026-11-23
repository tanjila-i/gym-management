import express from "express";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRoute from "./src/routes/authRoute.js";
import bookingRoute from "./src/routes/BookingRoute.js";
import memberShipRouter from "./src/routes/memberShipRoute.js";

const app = express();

const port = process.env.PORT || 4000;

// All Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// All routes
app.use("/api/auth", authRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/member", memberShipRouter);

app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});

// server error handel
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
