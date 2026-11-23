import React, { useState } from "react";
import Input from "./Input";
import { Lock } from "lucide-react";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="mx-auto max-w-lg px-4 py-14 ">
      <div className="rounded-2xl text-white mt-30 shadow-black shadow-xl border border-neutral-800 bg-neutral-900 p-8">
        <h2 className="lg:text-3xl md:text-2xl text-xl font-bold mb-6 text-center ">
          Reset Password
        </h2>
        <form>
          {" "}
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full mb-2 rounded-lg bg-amber-400 py-2.5 font-semibold text-neutral-950 lg:mt-4 lg:mb-2 hover:bg-amber-300"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
