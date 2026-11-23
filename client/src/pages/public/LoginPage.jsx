import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { userAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLoading, error } = userAuthStore();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handelForm = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
      toast.success("Sign Up Successfully!");
    } catch (error) {
      toast.error("Error signing up");
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-14 ">
      <div className="rounded-2xl text-white shadow-black shadow-xl border border-neutral-800 bg-neutral-900 p-8 ">
        <h1 className="lg:text-2xl md:text-xl sm:text-lg font-bold mt-1 mb-3 text-center">
          Login
        </h1>
        <p className="mt-1 mb-5 text-sm text-neutral-400 text-center">
          Login to your account
        </p>

        {/* Render error string directly */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form className="mt-6 space-y-1 " onSubmit={handelForm}>
          {" "}
          <Input
            icon={Mail}
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-amber-400 py-2.5 font-semibold text-neutral-950 mt-5 hover:bg-amber-300 disabled:opacity-50"
          >
            {isLoading ? "sign In..." : "Complete signin"}
          </button>
        </form>

        <Link to="/reset-password">
          <p className="hover:underline mt-3 hover:text-gray-400">
            Forget password
          </p>
        </Link>

        <p className="mt-5 text-center text-xs text-neutral-400">
          New member?{" "}
          <Link to="/register" className="text-amber-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
