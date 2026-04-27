"use client";

import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const inputCls =
  "w-full bg-zinc-900 border border-white/[0.08] text-white text-sm placeholder:text-white/25 rounded-xl px-4 py-3 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-200";

const labelCls = "text-white/40 text-xs uppercase tracking-widest font-medium";

export default function Login() {
  const { userLogin, setUser, logInWithGoogle } = useContext(AuthContext);

  const router = useRouter();
  const redirectPath = "/";

  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await userLogin(email, password);
      setUser(result.user);
      toast.success("Logged in successfully");
      setTimeout(() => router.push(redirectPath), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await logInWithGoogle();
      const user = result.user;
      setUser(user);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
      toast.success("Logged in with Google");
      setTimeout(() => router.push(redirectPath), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-16 relative overflow-hidden">

      {/* Background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-600/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white tracking-tight mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Brand
          </Link>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Welcome back
          </h2>
          <p className="text-white/30 text-xs">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8">

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {googleLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <FaGoogle className="text-sm" />
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-white/20 text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className={inputCls}
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className={labelCls}>Password</label>
                <Link
                  href={`/forgot-password?email=${emailInput}`}
                  className="text-white/30 hover:text-emerald-400 text-xs transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                className={inputCls}
                required
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-400 text-zinc-900 font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>
        </div>

        {/* Register link */}
        <p className="text-center text-white/30 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-medium">
            Create one
          </Link>
        </p>

      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastClassName="!bg-zinc-900 !border !border-white/[0.08] !text-white/80 !rounded-xl !text-sm"
      />
    </main>
  );
}