"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

/* ── shared field styles ── */
const inputCls =
  "w-full bg-zinc-900 border border-white/[0.08] text-white text-sm placeholder:text-white/25 rounded-xl px-4 py-3 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-200";

const labelCls = "text-white/40 text-xs uppercase tracking-widest font-medium";

export default function AddItemPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const newItem = {
      title: form.title.value,
      shortDesc: form.shortDesc.value,
      fullDesc: form.fullDesc.value,
      price: Number(form.price.value),
      image: form.image.value,
      email: user?.email,
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items`, newItem);
      toast.success("Item added successfully!");
      form.reset();
    } catch (err) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-16">

        {/* Card */}
        <div className="w-full max-w-lg rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8 md:p-10">

          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              New Listing
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Add New Item
            </h2>
            <p className="text-white/30 text-xs text-center">
              Fill in the details below to publish your item.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Title</label>
              <input
                name="title"
                placeholder="e.g. Mechanical Keyboard"
                className={inputCls}
                required
              />
            </div>

            {/* Short Description */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Short Description</label>
              <input
                name="shortDesc"
                placeholder="One-line summary of the item"
                className={inputCls}
                required
              />
            </div>

            {/* Full Description */}
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Full Description</label>
              <textarea
                name="fullDesc"
                placeholder="Detailed description — features, condition, specs…"
                rows={4}
                className={`${inputCls} resize-none`}
                required
              />
            </div>

            {/* Price + Image URL side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Price (৳)</label>
                <input
                  name="price"
                  type="number"
                  placeholder="0"
                  className={inputCls}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Image URL</label>
                <input
                  name="image"
                  placeholder="https://…"
                  className={inputCls}
                />
              </div>
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
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none" viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Adding…
                </>
              ) : (
                "Add Item"
              )}
            </button>

          </form>
        </div>

        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastClassName="!bg-zinc-900 !border !border-white/[0.08] !text-white/80 !rounded-xl !text-sm"
        />
      </main>
    </PrivateRoute>
  );
}