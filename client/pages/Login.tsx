import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://ela-ee0o.onrender.com/user/logIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await res.json();

      // تخزين التوكن والبيانات
      localStorage.setItem("token", data.token?.role || "");
      localStorage.setItem("refreshToken", data.ref_token || "");
      localStorage.setItem("role", data.role || "");
      localStorage.setItem("isAuthenticated", "true");

      console.log("Role:", data.token?.role, data.role);

      // توجيه حسب الدور
      if (data.token?.role === "Admin" || data.role === "Admin") {
        window.location.href = "http://localhost:8081"; // admin dashboard
      } else {
        window.location.href = "http://localhost:8080/student-dashboard"; // student dashboard
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F38ef883953564d1a82331b4c525de032%2Fe861ade0635241c398abb23cc1b3fee3?format=webp&width=800"
            alt="Smart Learning Academy Logo"
            className="w-32 h-32 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-3 py-2 pr-10 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
