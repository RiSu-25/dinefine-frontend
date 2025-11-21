"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiLock } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary static credentials
    if (email === "admin@dinefine.com" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#e9f5f3] to-[#d8eaf7]">
      <form
        onSubmit={handleLogin}
        className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4 border border-white/20"
      >
        <h2 className="text-2xl font-semibold text-center">Admin Login</h2>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <div className="relative">
          <FiUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative">
          <FiLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}


// Email: admin@dinefine.com
// Password: admin123

