import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrialSession",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrialSession",
    },
  },
  { timestamps: true },
);
const Booking = mongoose.model("AdminSchema", adminSchema);

export default Booking;
