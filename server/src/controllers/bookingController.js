import Booking from "../models/Booking.js";

// @desc    Create a new trial session booking
// @route   POST /api/bookings
export const registerBooking = async (req, res) => {
  try {
    // 1. Remove userId from req.body
    const {
      fullName,
      phoneNumber,
      emailAddress,
      preferredDate,
      preferredTime,
    } = req.body;

    // 2. Pass req.userId from your verifyToken middleware
    const newBooking = await Booking.create({
      userId: req.userId,
      fullName,
      phoneNumber,
      emailAddress,
      preferredDate,
      preferredTime,
    });

    res.status(201).json({
      success: true,
      message: "Trial session booked successfully",
      data: newBooking,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get all bookings (with optional status or userId filtering)
// @route   GET /api/bookings
export const getAllBookings = async (req, res) => {
  try {
    const { status, userId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (userId) filter.userId = userId;

    const bookings = await Booking.find(filter)
      .populate("userId", "fullName email") // Adjust fields based on your User model
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "userId",
      "FullName email",
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Invalid Booking ID",
    });
  }
};

// @desc    Get all bookings for a specific user
// @route   GET /api/bookings/user/:userId
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({
      preferredDate: 1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// @desc    Update booking details or status
// @route   PATCH /api/bookings/:id
export const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensures status enum and required fields are validated
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update booking",
    });
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};