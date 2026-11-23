import { create } from "zustand";
import axios from "axios";
const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const bookingStore = create((set) => ({
  booking: null,
  error: null,
  isLoading: false,

  registerBooking: async (
    fullName,
    phoneNumber,
    emailAddress,
    preferredDate,
    preferredTime,
  ) => {
    try {
      const response = await axios.post(`${API_URL}/booking/register-booking`, {
        fullName,
        phoneNumber,
        emailAddress,
        preferredDate,
        preferredTime,
      });

      set({
        booking: response.data.booking,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || "Error signup",
        isLoading: false,
      });
      throw error;
    }
  },
}));
