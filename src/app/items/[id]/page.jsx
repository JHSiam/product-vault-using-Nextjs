"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`
        );
        setItem(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  /* ── Loading ── */
  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
          <p className="text-white/30 text-sm">Loading item…</p>
        </div>
      </main>
    );
  }

  /* ── Not found ── */
  if (!item) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-2xl">
            🔍
          </div>
          <p className="text-white/60 font-medium">Item not found</p>
          <button
            onClick={() => router.push("/items")}
            className="text-sm text-white/40 hover:text-white transition-colors duration-200 mt-1"
          >
            ← Back to Items
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-14">

        {/* ── Back button ── */}
        <button
          onClick={() => router.push("/items")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors duration-200 mb-10 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Items
        </button>

        {/* ── Main layout ── */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/[0.07] aspect-square md:aspect-auto md:min-h-[400px]">
            <img
              src={item.image || "https://placehold.co/600x500/18181b/3f3f46?text=No+Image"}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {/* subtle bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950/50 to-transparent pointer-events-none" />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 justify-center">

            {/* Badge + Title */}
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                Item Details
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
                {item.title}
              </h1>
            </div>

            {/* Short desc */}
            <p className="text-white/50 text-sm leading-relaxed">
              {item.shortDesc}
            </p>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Price + Date */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs uppercase tracking-widest">Price</span>
                <span className="text-emerald-400 font-bold text-xl">
                  ৳ {item.price}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs uppercase tracking-widest">Listed on</span>
                <span className="text-white/50 text-sm">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Full Description ── */}
        <div className="mt-12 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-7 md:p-10">
          <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-emerald-400 inline-block" />
            Full Description
          </h2>
          <p className="text-white/45 text-sm leading-relaxed">
            {item.fullDesc}
          </p>
        </div>

      </div>
    </main>
  );
}