"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import Swal from "sweetalert2";

export default function ManageItemsPage() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/items/user/${user?.email}`
      );
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchItems();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
      toast.success("Item deleted successfully ✅");
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete ❌");
    }
  };

  const handleEdit = async (item) => {
    const { value: formValues } = await Swal.fire({
      html: `
        <style>
          /* ── backdrop ── */
          .swal2-container { padding: 1rem !important; }

          /* ── popup ── */
          .swal-edit-popup {
            background: #0f0f11 !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 20px !important;
            padding: 2rem !important;
            width: 100% !important;
            max-width: 480px !important;
            box-shadow: 0 25px 60px rgba(0,0,0,0.6) !important;
          }

          /* ── field wrapper ── */
          .swal-edit-popup .swal2-html-container {
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
          }

          /* ── shared input/textarea reset ── */
          .swal-field {
            display: block;
            width: 100%;
            background: #18181b;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            color: #fff;
            font-size: 0.875rem;
            padding: 0.7rem 1rem;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
            box-sizing: border-box;
            font-family: inherit;
            margin: 0 !important;
          }
          .swal-field::placeholder { color: rgba(255,255,255,0.2); }
          .swal-field:focus {
            border-color: rgba(52,211,153,0.5);
            box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
          }

          /* ── form layout ── */
          .swal-form {
            display: flex;
            flex-direction: column;
            gap: 0.875rem;
            text-align: left;
          }
          .swal-form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          @media (max-width: 400px) {
            .swal-form-row { grid-template-columns: 1fr; }
          }

          /* ── label ── */
          .swal-label {
            display: block;
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(255,255,255,0.3);
            margin-bottom: 0.35rem;
            font-weight: 500;
          }

          /* ── heading ── */
          .swal-heading {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }
          .swal-heading-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #34d399;
            box-shadow: 0 0 8px #34d399;
            flex-shrink: 0;
          }
          .swal-heading-text {
            font-size: 1.1rem;
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.02em;
          }

          /* ── actions ── */
          .swal-edit-popup .swal2-actions {
            margin-top: 1.5rem !important;
            gap: 0.6rem !important;
            justify-content: stretch !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .swal-edit-popup .swal2-actions button {
            flex: 1 !important;
            border-radius: 12px !important;
            font-size: 0.875rem !important;
            font-weight: 600 !important;
            padding: 0.7rem 1rem !important;
            border: none !important;
            transition: opacity 0.2s, transform 0.15s !important;
            margin: 0 !important;
          }
          .swal-edit-popup .swal2-confirm {
            background: #34d399 !important;
            color: #09090b !important;
          }
          .swal-edit-popup .swal2-confirm:hover { opacity: 0.88 !important; transform: translateY(-1px) !important; }
          .swal-edit-popup .swal2-cancel {
            background: rgba(255,255,255,0.06) !important;
            color: rgba(255,255,255,0.5) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
          }
          .swal-edit-popup .swal2-cancel:hover {
            background: rgba(255,255,255,0.1) !important;
            color: #fff !important;
          }
        </style>

        <div class="swal-heading">
          <span class="swal-heading-dot"></span>
          <span class="swal-heading-text">Edit Item</span>
        </div>

        <div class="swal-form">

          <!-- Title (full width) -->
          <div>
            <label class="swal-label">Title</label>
            <input id="title" class="swal-field" placeholder="e.g. Mechanical Keyboard" value="${item.title}">
          </div>

          <!-- Price + Image side by side -->
          <div class="swal-form-row">
            <div>
              <label class="swal-label">Price (৳)</label>
              <input id="price" type="number" class="swal-field" placeholder="0" value="${item.price}">
            </div>
            <div>
              <label class="swal-label">Image URL</label>
              <input id="image" class="swal-field" placeholder="https://…" value="${item.image}">
            </div>
          </div>

          <!-- Short Desc -->
          <div>
            <label class="swal-label">Short Description</label>
            <textarea id="shortDesc" class="swal-field" rows="2" placeholder="One-line summary">${item.shortDesc}</textarea>
          </div>

          <!-- Full Desc -->
          <div>
            <label class="swal-label">Full Description</label>
            <textarea id="fullDesc" class="swal-field" rows="3" placeholder="Detailed description…">${item.fullDesc}</textarea>
          </div>

        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      customClass: { popup: "swal-edit-popup" },
      background: "#0f0f11",
      showClass: { popup: "animate__animated animate__fadeInDown animate__faster" },
      hideClass: { popup: "animate__animated animate__fadeOutUp animate__faster" },
      preConfirm: () => ({
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        shortDesc: document.getElementById("shortDesc").value,
        fullDesc: document.getElementById("fullDesc").value,
      }),
    });

    if (!formValues) return;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/items/${item._id}`,
        formValues
      );
      toast.success("Item updated successfully ✏️");
      setItems(items.map((i) => (i._id === item._id ? { ...i, ...formValues } : i)));
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
          <p className="text-white/30 text-sm">Loading your items…</p>
        </div>
      </main>
    );
  }

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">

          {/* ── Page header ── */}
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Manage Your Items
            </h1>
            <p className="text-white/35 text-sm">
              {items.length} {items.length === 1 ? "item" : "items"} listed under{" "}
              <span className="text-white/50">{user?.email}</span>
            </p>
          </div>

          {items.length === 0 ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center gap-4 py-28 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-2xl">
                📦
              </div>
              <p className="text-white/60 font-medium">No items yet</p>
              <p className="text-white/30 text-sm max-w-xs">
                You haven't listed anything. Add your first item to get started.
              </p>
              <Link
                href="/items/add"
                className="mt-2 bg-emerald-400 text-zinc-900 text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 hover:-translate-y-px transition-all duration-200"
              >
                Add Item
              </Link>
            </div>
          ) : (
            /* ── Table ── */
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden">

              {/* Table header */}
              <div className="grid grid-cols-[64px_1fr_100px_110px_140px] gap-4 items-center px-5 py-3 bg-white/[0.04] border-b border-white/[0.07]">
                <span className="text-white/30 text-xs uppercase tracking-widest">Image</span>
                <span className="text-white/30 text-xs uppercase tracking-widest">Title</span>
                <span className="text-white/30 text-xs uppercase tracking-widest">Price</span>
                <span className="text-white/30 text-xs uppercase tracking-widest">Date</span>
                <span className="text-white/30 text-xs uppercase tracking-widest text-right">Actions</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/[0.05]">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-[64px_1fr_100px_110px_140px] gap-4 items-center px-5 py-4 hover:bg-white/[0.03] transition-colors duration-150 group"
                  >
                    {/* Image */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.07] shrink-0">
                      <img
                        src={item.image || "https://placehold.co/56x56/18181b/3f3f46?text=?"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title */}
                    <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors duration-150">
                      {item.title}
                    </p>

                    {/* Price */}
                    <p className="text-emerald-400 text-sm font-semibold">
                      ৳ {item.price}
                    </p>

                    {/* Date */}
                    <p className="text-white/35 text-xs">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 justify-end">
                      {/* View */}
                      <Link href={`/items/${item._id}`}>
                        <button className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-200">
                          View
                        </button>
                      </Link>

                      {/* Edit */}
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-xs text-amber-400/80 hover:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-400/10 hover:border-amber-400/30 hover:bg-amber-400/[0.07] transition-all duration-200"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-xs text-red-400/70 hover:text-red-400 px-3 py-1.5 rounded-lg border border-red-400/10 hover:border-red-400/30 hover:bg-red-400/[0.07] transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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