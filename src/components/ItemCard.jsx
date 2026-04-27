"use client";

import Link from "next/link";

export default function ItemCard({ item }) {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-emerald-400/30 hover:bg-white/[0.05] overflow-hidden transition-all duration-300">

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl z-10" />

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-900 shrink-0">
        <img
          src={item.image || "https://placehold.co/300x200/18181b/3f3f46?text=No+Image"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* image bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-950/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col flex-grow gap-3">

        {/* Title */}
        <h2 className="text-white font-semibold text-sm leading-snug line-clamp-1 group-hover:text-emerald-400 transition-colors duration-200">
          {item.title}
        </h2>

        {/* Description */}
        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 flex-grow">
          {item.shortDesc || "No description available."}
        </p>

        {/* Price (if exists) + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
          {item.price != null ? (
            <span className="text-white font-bold text-sm">
              ${item.price}
            </span>
          ) : (
            <span />
          )}

          <Link
            href={`/items/${item._id}`}
            className="text-xs font-medium text-zinc-900 bg-emerald-400 hover:opacity-90 hover:-translate-y-px active:translate-y-0 transition-all duration-200 px-4 py-1.5 rounded-lg"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
}