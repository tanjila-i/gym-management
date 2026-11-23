import express from "express";
import {
  createPlan,
  deletePlan,
  getAllPlans,
  seedPlans,
  updatePlan,
} from "../controllers/MembershipController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const memberShipRouter = express.Router();

// Replace with your actual JWT verify middleware
// const { protect } = require("../middleware/authMiddleware");

// Admin-only role check middleware
// const adminOnly = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({
//     success: false,
//     message: "Access denied. Admins only.",
//   });
// };

// Public route so frontend can render the cards
memberShipRouter.get("/", getAllPlans);

// Admin-protected routes
memberShipRouter.post("/seed", verifyToken, seedPlans);
memberShipRouter.post("/", verifyToken, createPlan);
memberShipRouter.put("/:id", verifyToken, updatePlan);
memberShipRouter.delete("/:id", verifyToken, deletePlan);

export default memberShipRouter;
