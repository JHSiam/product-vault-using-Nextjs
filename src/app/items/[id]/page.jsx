"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch item
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

  if (loading) {
    return <div className="text-center mt-10">Loading item...</div>;
  }

  if (!item) {
    return <div className="text-center mt-10">Item not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Back Button */}
      <button
        onClick={() => router.push("/items")}
        className="btn btn-outline mb-6"
      >
        ← Back to Items
      </button>

      {/* Main Layout */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Image */}
        <div>
          <img
            src={item.image}
            alt={item.title}
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {item.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {item.shortDesc}
          </p>

          <p className="text-lg font-semibold text-green-600 mb-4">
            ৳ {item.price}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Created:{" "}
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Full Description */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">
          Full Description
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {item.fullDesc}
        </p>
      </div>
    </div>
  );
}