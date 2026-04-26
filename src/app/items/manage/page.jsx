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

  // 🔥 Fetch user items
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

  // 🔴 DELETE with SweetAlert confirm
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
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`
      );

      toast.success("Item deleted successfully ✅");

      // update UI
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete ❌");
    }
  };

  // 🟡 EDIT with SweetAlert modal
  const handleEdit = async (item) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Item",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${item.title}">
        <input id="price" type="number" class="swal2-input" placeholder="Price" value="${item.price}">
        <input id="image" class="swal2-input" placeholder="Image URL" value="${item.image}">
        <textarea id="shortDesc" class="swal2-textarea" placeholder="Short Description">${item.shortDesc}</textarea>
        <textarea id="fullDesc" class="swal2-textarea" placeholder="Full Description">${item.fullDesc}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          price: document.getElementById("price").value,
          image: document.getElementById("image").value,
          shortDesc: document.getElementById("shortDesc").value,
          fullDesc: document.getElementById("fullDesc").value,
        };
      },
    });

    if (!formValues) return;

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/items/${item._id}`,
        formValues
      );

      toast.success("Item updated successfully ✏️");

      // update UI instantly
      const updatedItems = items.map((i) =>
        i._id === item._id ? { ...i, ...formValues } : i
      );
      setItems(updatedItems);
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <PrivateRoute>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Manage Your Items
        </h1>

        <div className="overflow-x-auto">
          <table className="table w-full border">

            <thead className="bg-gray-200">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id} className="hover">

                    <td>
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td>{item.title}</td>

                    <td>৳ {item.price}</td>

                    <td>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="flex gap-2 flex-wrap">

                      {/* View */}
                      <Link href={`/items/${item._id}`}>
                        <button className="btn btn-sm btn-info">
                          View
                        </button>
                      </Link>

                      {/* Edit (Modal) */}
                      <button
                        onClick={() => handleEdit(item)}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <ToastContainer />
      </div>
    </PrivateRoute>
  );
}