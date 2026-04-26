"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav style={{ padding: "10px 20px", borderBottom: "1px solid #ccc" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left */}
        <div style={{ display: "flex", gap: "15px" }}>
          <Link href="/">Home</Link>
          <Link href="/items">Items</Link>
          <Link href="/about">About</Link>
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: "15px" }}>
          {user ? (
            <>
              <span>{user?.email}</span>
              <Link href="/items/add">Add Item</Link>
              <Link href="/items/manage">Manage Items</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;