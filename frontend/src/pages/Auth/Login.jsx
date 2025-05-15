import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout";
import { Lock, Mail } from "lucide-react";
import Input from "../../components/ui/Input/Input";
import { Link } from "react-router";
import { isValidEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPaths";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: null, password: null });
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let errors = { email: null, password: null };
    let hasError = false;

    if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
      hasError = true;
    }

    setError(errors);
    if (hasError) return;

    // API Calls

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // Redirect based on role

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong. Please Try Again");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Adress"
            icon={Mail}
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
          />
          <Input
            type="password"
            label="Password"
            icon={Lock}
            placeholder="Min 8 Characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            LOGIN
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account ?{" "}
          <Link to="/signUp" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
