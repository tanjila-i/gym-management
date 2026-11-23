import MembershipPlan from "../models/MemberShipPlan.js";

// @desc    Get all active membership plans (Public / User facing)
// @route   GET /api/plans
export const getAllPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find({ isActive: true }).sort({
      order: 1,
      price: 1,
    });
    res.status(200).json({ success: true, count: plans.length, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new membership plan (Admin only)
// @route   POST /api/plans
export const createPlan = async (req, res) => {
  try {
    // Optional: If this plan is set to Most Popular, unset others
    if (req.body.isMostPopular) {
      await MembershipPlan.updateMany({}, { isMostPopular: false });
    }

    const plan = await MembershipPlan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a membership plan (Admin only)
// @route   PUT /api/plans/:id
export const updatePlan = async (req, res) => {
  try {
    if (req.body.isMostPopular) {
      await MembershipPlan.updateMany(
        { _id: { $ne: req.params.id } },
        { isMostPopular: false },
      );
    }

    const plan = await MembershipPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Membership plan not found" });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a membership plan (Admin only)
// @route   DELETE /api/plans/:id
export const deletePlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Membership plan not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Membership plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Seed initial plans matching the UI design
// @route   POST /api/plans/seed
export const seedPlans = async (req, res) => {
  try {
    await MembershipPlan.deleteMany({});

    const initialPlans = [
      {
        name: "Essential",
        slug: "essential",
        price: 39,
        billingCycle: "/month",
        features: [
          "Gym floor & cardio access",
          "Standard opening hours",
          "Locker room access",
        ],
        buttonText: "Select Essential",
        sortOrder: 1,
      },
      {
        name: "Pro Monthly",
        slug: "pro-monthly",
        price: 69,
        billingCycle: "/month",
        features: [
          "All gym zones & functional area",
          "Group class bookings",
          "1 initial fitness assessment",
        ],
        badge: "Most Popular",
        isHighlighted: true,
        buttonText: "Select Pro Monthly",
        sortOrder: 2,
      },
      {
        name: "Annual All-Access",
        slug: "annual-all-access",
        price: 649,
        billingCycle: "/year",
        features: [
          "Unlimited classes & priority booking",
          "2 months free equivalent",
          "Guest pass allowance",
        ],
        buttonText: "Select Annual All-Access",
        sortOrder: 3,
      },
    ];

    const createdPlans = await MembershipPlan.insertMany(initialPlans);
    res.status(201).json({ success: true, data: createdPlans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
