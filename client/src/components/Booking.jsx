import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Added missing import
import { bookingStore } from "../store/bookingStore";
import toast from "react-hot-toast";

const Booking = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (07:00 – 11:00)");

  const { isLoading, registerBooking } = bookingStore();
  const navigate = useNavigate(); // 2. Initialized navigate

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerBooking(
        fullName,
        phoneNumber,
        emailAddress,
        preferredDate,
        preferredTime,
      );
      toast.success("Booking registered successfully!");

      // 3. Reset form, close modal, and navigate ONLY on success
      setFullName("");
      setPhoneNumber("");
      setEmailAddress("");
      setPreferredDate("");
      onClose();
      navigate("/dashboard/member");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error registering booking");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
    >
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <h2 id="trial-modal-title" className="text-xl font-bold">
            Book a Free Trial Session
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-sm">
          <div>
            <label htmlFor="trial-name" className="mb-1 block text-neutral-300">
              Full Name *
            </label>
            <input
              id="trial-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trial-phone"
                className="mb-1 block text-neutral-300"
              >
                Phone Number *
              </label>
              <input
                id="trial-phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="trial-email"
                className="mb-1 block text-neutral-300"
              >
                Email Address *
              </label>
              <input
                id="trial-email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required // 4. Made required since you redirect to /verify-email
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trial-date"
                className="mb-1 block text-neutral-300"
              >
                Preferred Date *
              </label>
              <input
                id="trial-date"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="trial-time"
                className="mb-1 block text-neutral-300"
              >
                Preferred Time
              </label>
              <select
                id="trial-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white focus:border-amber-400 focus:outline-none"
              >
                <option value="Morning (07:00 – 11:00)">
                  Morning (07:00 – 11:00)
                </option>
                <option value="Afternoon (12:00 – 16:00)">
                  Afternoon (12:00 – 16:00)
                </option>
                <option value="Evening (17:00 – 21:00)">
                  Evening (17:00 – 21:00)
                </option>
              </select>
            </div>
          </div>

          {/* 5. Disabled button while loading */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-lg bg-amber-400 py-2.5 font-semibold text-neutral-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Request Trial Session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
