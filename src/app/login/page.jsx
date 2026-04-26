"use client";

import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const { userLogin, setUser, logInWithGoogle } = useContext(AuthContext);

  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔹 Get redirect path (for protected routes later)
  const redirectPath = searchParams.get("redirect") || "/";

  const [emailInput, setEmailInput] = useState("");

  // 🔹 Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await userLogin(email, password);
      setUser(result.user);

      toast.success("Logged in successfully");

      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 🔹 Google Login
 const handleGoogleLogin = async () => {
  try {
    const result = await logInWithGoogle();
    const user = result.user;

    setUser(user);

    // 🔥 Save/update user in DB
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    });

    toast.success("Logged in with Google");

    setTimeout(() => {
      router.push(redirectPath);
    }, 1500);
  } catch (err) {
    toast.error(err.message);
  }
};

  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full mb-3"
            required
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full mb-3"
            required
          />

          {/* Forgot Password */}
          <div className="text-right mb-3">
            <Link
              href={`/forgot-password?email=${emailInput}`}
              className="text-sm text-blue-600"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full mb-4">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow" />
          <span className="px-2">OR</span>
          <hr className="flex-grow" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Login with Google
        </button>

        {/* Register Link */}
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}