"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/items`,
        newItem
      );

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 shadow-md rounded w-full max-w-lg">

          <h2 className="text-2xl font-bold mb-4 text-center">
            Add New Item
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              name="title"
              placeholder="Title"
              className="input input-bordered w-full"
              required
            />

            <input
              name="shortDesc"
              placeholder="Short Description"
              className="input input-bordered w-full"
              required
            />

            <textarea
              name="fullDesc"
              placeholder="Full Description"
              className="textarea textarea-bordered w-full"
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              required
            />

            <input
              name="image"
              placeholder="Image URL"
              className="input input-bordered w-full"
            />

            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Item"}
            </button>

          </form>
        </div>

        <ToastContainer />
      </div>
    </PrivateRoute>
  );
}