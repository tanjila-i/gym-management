import React, { useState } from "react";
import { useMemberShipPlanStore } from "../../store/MemberShipPlanStore";
import toast from "react-hot-toast";

const CreateMemberShip = ({ isOpen = true, onClose }) => {
  const { error, isLoading, createPlan } = useMemberShipPlanStore();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: 0,
    features: [""],
    badge: "",
    isHighlighted: false,
    buttonText: "",
    sortOrder: 0,
    billingCycle: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlan(formData);
      toast.success("Plan was created successfully");
      onClose?.(); // Optional: close modal on success
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating plan");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-800 bg-[#141414] p-6 sm:p-8 text-white shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Create Membership Plan
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Plan Name <span className="text-zinc-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Pro Plan"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Slug <span className="text-zinc-400">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                placeholder="e.g. pro-plan"
                value={formData.slug}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Price & Sort Order */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Price <span className="text-zinc-400">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="sortOrder"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Sort Order
              </label>
              <input
                type="number"
                id="sortOrder"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Badge & Button Text */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="badge"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Badge (Optional)
              </label>
              <input
                type="text"
                id="badge"
                name="badge"
                placeholder="e.g. Most Popular"
                value={formData.badge}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="buttonText"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Button Text
              </label>
              <input
                type="text"
                id="buttonText"
                name="buttonText"
                placeholder="Select Pro Monthly"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="billingCycle"
                className="mb-2 w-full block text-sm font-medium text-zinc-300"
              >
                BillingCycle
              </label>
              <input
                type="text"
                id="billingCycle"
                name="billingCycle"
                placeholder="month or year"
                value={formData.billingCycle}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Dynamic Features List */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-[#1a1a1a] px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="rounded-lg border border-zinc-800 px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 text-xs font-medium text-amber-500 hover:text-amber-400"
            >
              + Add Feature
            </button>
          </div>

          {/* Highlighted Checkbox */}
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="isHighlighted"
              name="isHighlighted"
              checked={formData.isHighlighted}
              onChange={handleChange}
              className="h-4 w-4 rounded border-zinc-700 bg-[#1a1a1a] accent-amber-500"
            />
            <label htmlFor="isHighlighted" className="text-sm text-zinc-300">
              Highlight this membership plan
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-[#f5b400] py-3 text-sm font-semibold text-black transition-colors hover:bg-[#e0a400] active:scale-[0.99]"
            >
              {isLoading ? "Create Membership" : "Member was create...."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMemberShip;
