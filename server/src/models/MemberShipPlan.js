import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    currency: {
      type: String,
      default: "$",
    },
    billingCycle: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    badge: {
      type: String,
      default: null, // e.g., "Most Popular"
    },
    isHighlighted: {
      type: Boolean,
      default: false, // Controls the gold border styling
    },
    buttonText: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0, // Helps keep Essential (1), Pro (2), Annual (3) in order
    },
  },
  { timestamps: true },
);

const MembershipPlan = mongoose.model("MembershipPlan", membershipPlanSchema);

export default MembershipPlan;
