import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (err) {
      setError("Username atau password salah.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-semibold text-[#3A6B4C] text-center mb-2">
          Admin Login
        </h2>
        <p className="text-center text-[#3A6B4C]/80 mb-8">
          Selamat datang kembali!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#3A6B4C]/90 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
              placeholder="Masukkan username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3A6B4C]/90 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-semibold text-white bg-[#3A6B4C] hover:bg-[#2c523a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A6B4C] transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Login <FiLogIn />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;