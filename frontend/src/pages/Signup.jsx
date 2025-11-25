import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let tempErrors = { name: "", email: "", password: "" };

    if (!form.name || form.name.length < 3) { tempErrors.name = "Name must be at least 3 characters"; valid = false; }
    if (!validateEmail(form.email)) { tempErrors.email = "Enter a valid email"; valid = false; }
    if (!validatePassword(form.password)) { tempErrors.password = "Password must be strong"; valid = false; }

    setErrors(tempErrors);

    if (valid) {
      localStorage.setItem("collabspaceUser", JSON.stringify(form));
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm transform transition duration-500 hover:scale-[1.03]">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 animate-bounce">
        Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
          </div>

{/* Password with eye */}
<div className="relative">
  <label className="block text-gray-700 font-medium mb-1">Password</label>
  <input
    type={showPassword ? "text" : "password"} // hidden by default
    value={form.password}
    onChange={(e) => setForm({ ...form, password: e.target.value })}
    className={`w-full p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 pr-10 ${
      errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
    }`}
    placeholder="********"
  />
  
  {/* Eye icon */}
  <span
    className="absolute right-3 top-6/9 -translate-y-2/4 cursor-pointer text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEye /> : <FaEyeSlash />} 
  </span>

  {/* Error message */}
  {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
</div>


          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-indigo-700 transform hover:scale-105 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
