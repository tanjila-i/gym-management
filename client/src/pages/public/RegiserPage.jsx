import React, { useState } from "react";
import Input from "../../components/Input";
import { Lock, Mail, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);

  const { error, isLoading, signUp } = userAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select either Member or Trainer");
      return;
    }

    try {
      // Fixed argument order to match store definition
      await signUp(fullName, email, password, role, consentAccepted);
      toast.success("Signed up successfully!");
      navigate("/verify-email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-14">
      <div className="rounded-2xl text-white shadow-black shadow-xl border border-neutral-800 bg-neutral-900 p-8">
        <h1 className="lg:text-2xl md:text-xl text-lg font-bold mt-1 mb-3 text-center">
          Create An Account
        </h1>
        <p className="mt-1 lg:mb-5 mb-2 lg:text-sm text-xs text-neutral-400 text-center">
          Complete registration to access your dashboard and schedule.
        </p>

        {/* Render error string directly */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form className="lg:mt-6 mt-2 space-y-1" onSubmit={handleSubmit}>
          <div className="flex gap-5 text-center text-gray-400 lg:mb-5 mb-3 ml-1">
            <label className="flex gap-1 lg:text-xl md:text-lg text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={role === "member"}
                onChange={() => setRole(role === "member" ? "" : "member")}
              />
              Member
            </label>
            <label className="flex gap-1 lg:text-xl md:text-lg text-xs pt-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={role === "trainer"}
                onChange={() => setRole(role === "trainer" ? "" : "trainer")}
              />
              Trainer
            </label>
          </div>

          <Input
            icon={User}
            type="text"
            placeholder="Enter Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
            <Input
              icon={Mail}
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Phone}
              type="text"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Input
            icon={Lock}
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="flex items-start gap-2.5 text-xs text-neutral-400 pt-2">
            <input
              type="checkbox"
              checked={consentAccepted}
              required
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-0.5 mb-4"
            />
            <span>
              I agree to the Gym Terms of Service, Membership Cancellation
              Policy, and Privacy Notice.
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-amber-400 py-2.5 font-semibold text-neutral-950 mt-5 hover:bg-amber-300 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-neutral-400">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
