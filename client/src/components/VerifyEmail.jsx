import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, isLoading, error } = userAuthStore();

  const handelChange = (index, value) => {
    const newCode = [...code];

    // handel pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }

      setCode(newCode);

      //   Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRef.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRef.current[index + 1].focus();
      }
    }
  };
  const handelKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //   Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handelSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="mx-auto max-w-lg px-4 py-14 ">
      <div className="rounded-2xl text-white mt-60 shadow-black shadow-xl border border-neutral-800 bg-neutral-900 p-8 ">
        <h2 className="text-center text-2xl font-bold text-gray-100">
          Verify your Email
        </h2>
        <p className="text-center font-semibold text-gray-500 mt-2">
          Enter the 6-digit code send to your email address
        </p>

        <form className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handelChange(index, e.target.value)}
                onKeyDown={(e) => handelKeyDown(index, e)}
                className="lg:w-12 lg:h-12 md:w-12 md:h-12 w-8 h-8 text-center text-2xl mt-7 font-bold bg-gray-500 lg:rounded-lg md:rounded-lg rounded"
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
