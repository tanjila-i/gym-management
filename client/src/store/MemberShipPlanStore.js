import { create } from "zustand";
import axios from "axios";

const API_URL = "https://gym-management-lf7l.onrender.com/api";
axios.defaults.withCredentials = true;

export const useMemberShipPlanStore = create((set) => ({
  memberShip: null,
  error: null,
  isLoading: false,

  createPlan: async (planData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/member`, planData);
      set({
        memberShip: response.data.memberShip,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error creating plan",
        isLoading: false,
      });
      throw error;
    }
  },

  getAllPlan: async (queryParams = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/member`, {
        params: queryParams,
      });

      set({
        plans: response.data.data || [], // Changed from .memberShip to .data
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error fetching plans",
        isLoading: false,
      });
      throw error;
    }
  },
  getSeedPlan: async (queryParams = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/member/seed`, {
        params: queryParams,
      });

      set({
        plans: response.data.data || [], // Changed from .memberShip to .data
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error fetching plans",
        isLoading: false,
      });
      throw error;
    }
  },

  deletePlan: async (planId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/member/${planId}`);

      // Remove the deleted plan from the local state array
      set((state) => ({
        plans: state.plans.filter((plan) => plan._id !== planId),
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error deleting plan",
        isLoading: false,
      });
      throw error;
    }
  },

  editPlan: async (planId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${API_URL}/member/${planId}`,
        updatedData,
      );

      // Update the specific plan in the local state array
      set((state) => ({
        plans: state.plans.map(
          (plan) => (plan._id === planId ? response.data : plan), // Use response.data.plan if your API wraps it
        ),
        isLoading: false,
      }));

      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error updating plan",
        isLoading: false,
      });
      throw error;
    }
  },
}));
