"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "@/components/ItemCard";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchItems = async (customParams = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(customParams);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/items?${params.toString()}`
      );
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems({ search });
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    fetchItems({ minPrice, maxPrice });
  };

  const handleDateFilter = (e) => {
    e.preventDefault();
    fetchItems({ startDate, endDate });
  };

  /* ── shared input class ── */
  const inputCls =
    "w-full bg-zinc-900 border border-white/[0.08] text-white text-sm placeholder:text-white/25 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-200";

  /* ── shared submit button class ── */
  const btnCls =
    "w-full bg-emerald-400 text-zinc-900 text-sm font-semibold rounded-xl px-5 py-2.5 hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer whitespace-nowrap";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">

        {/* ── Page header ── */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
            Catalogue
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            All Items
          </h1>
          <p className="text-white/40 text-sm max-w-sm">
            Search, filter by price or date, and find exactly what you need.
          </p>
        </div>

        {/* ── Filter panel ── */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 mb-10 flex flex-col gap-4">

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 flex-col sm:flex-row">
            <div className="relative flex-1">
              {/* search icon */}
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search items…"
                className={`${inputCls} pl-10`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className={`${btnCls} sm:w-auto px-7`}>
              Search
            </button>
          </form>

          {/* Divider */}
          <div className="h-px bg-white/[0.06]" />

          {/* Price + Date filters stacked in column */}
          <div className="flex flex-col gap-4">

            {/* Price filter */}
            <form onSubmit={handlePriceFilter} className="flex flex-col gap-2">
              <p className="text-white/30 text-xs uppercase tracking-widest font-medium">
                Price range
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className={inputCls}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className={inputCls}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button type="submit" className="bg-emerald-400 text-zinc-900 text-xs font-semibold rounded-lg px-4 py-2 hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer shrink-0">
                  Apply
                </button>
              </div>
            </form>

            {/* Date filter */}
            <form onSubmit={handleDateFilter} className="flex flex-col gap-2">
              <p className="text-white/30 text-xs uppercase tracking-widest font-medium">
                Date range
              </p>
              <div className="flex gap-2">
                <input
                  type="date"
                  className={`${inputCls} [color-scheme:dark]`}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className={`${inputCls} [color-scheme:dark]`}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <button type="submit" className="bg-emerald-400 text-zinc-900 text-xs font-semibold rounded-lg px-4 py-2 hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer shrink-0">
                  Apply
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array(8).fill(0).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden animate-pulse"
              >
                <div className="h-44 bg-white/[0.05]" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-3 bg-white/[0.07] rounded-full w-3/4" />
                  <div className="h-3 bg-white/[0.05] rounded-full w-1/2" />
                  <div className="h-8 bg-white/[0.04] rounded-lg mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Items grid ── */}
        {!loading && (
          <>
            {items.length > 0 ? (
              <>
                {/* Result count */}
                <p className="text-white/30 text-xs mb-5">
                  {items.length} {items.length === 1 ? "item" : "items"} found
                </p>

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((item) => (
                    <ItemCard key={item._id} item={item} />
                  ))}
                </div>
              </>
            ) : (
              /* ── Empty state ── */
              <div className="flex flex-col items-center justify-center gap-4 py-28 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-2xl">
                  🔍
                </div>
                <p className="text-white/60 font-medium">No items found</p>
                <p className="text-white/30 text-sm max-w-xs">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}