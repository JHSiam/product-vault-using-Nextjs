"use client";

import Link from "next/link";

export default function ItemCard({ item }) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">

      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={item.image || "https://via.placeholder.com/300"}
          alt={item.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {item.title}
        </h2>

        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {item.shortDesc || "No description available"}
        </p>

        {/* Button */}
        <Link href={`/items/${item._id}`}>
          <button className="btn btn-primary w-full">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}