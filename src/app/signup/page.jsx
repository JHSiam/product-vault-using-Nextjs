"use client";

import { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const { createNewUser, setUser, updateUserProfile, logInWithGoogle } =
    useContext(AuthContext);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // 🔹 Register Handler
  const handleRegistration = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must have:\n- One uppercase\n- One lowercase\n- Min 6 chars"
      );
      return;
    } else {
      setPasswordError("");
    }

    try {
      const result = await createNewUser(email, password);
      const user = result.user;

      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      // 🔥 Send to backend (IMPORTANT)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        name: name,
        email: email,
        photo: photoURL,
      });

      setUser({ ...user, displayName: name, photoURL });

      toast.success("Registration successful!");

      setTimeout(() => {
        router.push("/");
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

      // 🔥 Send to backend
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      setUser(user);

      toast.success("Registered with Google!");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md py-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-700">
          Create an Account
        </h2>

        <form onSubmit={handleRegistration}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full mb-3"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full mb-3"
            required
          />

          {/* Photo URL */}
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="input input-bordered w-full mb-3"
          />

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mb-2">{passwordError}</p>
          )}

          {/* Register Button */}
          <button className="btn btn-primary w-full mb-4">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow" />
          <span className="px-2">OR</span>
          <hr className="flex-grow" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Register with Google
        </button>

        {/* Login Link */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}