import express from "express";
import {
  deleteBooking,
  getAllBookings,
  getBookingById,
  getUserBookings,
  registerBooking,
  updateBooking,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const bookingRoute = express.Router();

bookingRoute.post("/register-booking", verifyToken, registerBooking);
bookingRoute.get("/all-bookings", verifyToken, getAllBookings);
bookingRoute.get("/get-booking/:id", verifyToken, getBookingById);
bookingRoute.get("/user/:userId", verifyToken, getUserBookings);
bookingRoute.patch("/update-booking/:id", verifyToken, updateBooking);
bookingRoute.delete("/delete-booking/:id", verifyToken, deleteBooking);
export default bookingRoute;
