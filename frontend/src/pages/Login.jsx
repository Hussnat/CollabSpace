import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/-]).{8,}$/.test(password);

  const handleLogin = (e) => {
    e.preventDefault();

    let valid = true;
    let tempErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      tempErrors.email = "Enter a valid email.";
      valid = false;
    }
    if (!validatePassword(password)) {
      tempErrors.password =
        "Password must be 8+ chars with uppercase, lowercase, number & special char.";
      valid = false;
    }

    const savedUser = JSON.parse(localStorage.getItem("collabspaceUser"));

    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      tempErrors.password = "Wrong email or password!";
      valid = false;
    }

    setErrors(tempErrors);

    if (valid) {
      setSuccess("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard"); // Redirect to Dashboard
      }, 700);
    } else {
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm transform transition duration-500 hover:scale-[1.03]">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 pr-10 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="********"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        {success && (
          <p className="text-green-600 text-center font-medium mt-4">{success}</p>
        )}

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
