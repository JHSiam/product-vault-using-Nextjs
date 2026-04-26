"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "@/components/ItemCard";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search
  const [search, setSearch] = useState("");

  // 💰 Price filter
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 📅 Date filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔥 Universal fetch
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

  // 🔹 Initial load
  useEffect(() => {
    fetchItems();
  }, []);

  // 🔍 Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems({ search });
  };

  // 💰 Price filter handler
  const handlePriceFilter = (e) => {
    e.preventDefault();
    fetchItems({ minPrice, maxPrice });
  };

  // 📅 Date filter handler
  const handleDateFilter = (e) => {
    e.preventDefault();
    fetchItems({ startDate, endDate });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        All Items
      </h1>

      {/* 🔍 SEARCH */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Search items..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {/* 💰 PRICE FILTER */}
      <form onSubmit={handlePriceFilter} className="mb-6 grid gap-2 sm:grid-cols-3">
        <input
          type="number"
          placeholder="Min Price"
          className="input input-bordered w-full"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="input input-bordered w-full"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button className="btn btn-primary w-full">
          Filter Price
        </button>
      </form>

      {/* 📅 DATE FILTER */}
      <form onSubmit={handleDateFilter} className="mb-8 grid gap-2 sm:grid-cols-3">
        <input
          type="date"
          className="input input-bordered w-full"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="input input-bordered w-full"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button className="btn btn-primary w-full">
          Filter Date
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="text-center mb-6">Loading items...</div>
      )}

      {/* Grid */}
      <div className="grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4"
      >
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))
        ) : (
          !loading && (
            <p className="col-span-full text-center">
              No items found
            </p>
          )
        )}
      </div>
    </div>
  );
}