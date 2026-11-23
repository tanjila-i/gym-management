import express from "express";
import {
  checkAuth,
  forgotPassword,
  getAllUser,
  getMe,
  login,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRoute = express.Router();

authRoute.get("/check-auth", verifyToken, checkAuth);
authRoute.get("/all-users", verifyToken, getAllUser);

authRoute.post("/register", register);
authRoute.post("/verify-email", verifyEmail);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.post("/forgot-password", forgotPassword);
authRoute.post("/reset-password", resetPassword);
authRoute.get("/me", getMe);

export default authRoute;
