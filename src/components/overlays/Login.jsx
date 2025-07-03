import React, { useState } from "react";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Login = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phone number submitted:", phoneNumber);
    // Here you would typically handle the API call to send an OTP
    onClose(); // Close the modal on submission for now
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm relative text-white border border-white/10"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors rounded-full p-1"
        >
          <CloseIcon />
        </button>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Welcome to Bloomly</h2>
          <p className="text-gray-400 mt-2">
            Enter your phone number to sign in.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Phone Number
            </label>
            <div className="flex items-center bg-gray-800/50 rounded-lg border border-gray-700 focus-within:ring-2 focus-within:ring-sky-500 transition-all">
              <span className="pl-4 pr-2 text-gray-400">+91</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="98765 43210"
                className="flex-1 bg-transparent p-3 focus:outline-none w-full"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-sky-500/20"
          >
            Send OTP
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-8 text-center">
          We'll send you a one-time password (OTP) to verify your number.
        </p>
      </div>
    </div>
  );
};

export default Login;
