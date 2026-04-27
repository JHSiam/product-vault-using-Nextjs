"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Items" },
    { href: "/items/add", label: "Add Item" },
    { href: "/items/manage", label: "Manage Items" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.4)]"
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-white tracking-tight shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Product Vault
          </Link>

          {/* Center Nav Links — desktop */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-white/60 hover:text-white hover:bg-white/[0.07] text-sm px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <>
                {/* Email */}
                <span className="text-white/40 text-xs max-w-[130px] truncate">
                  {user?.email}
                </span>

                {/* Divider */}
                <div className="w-px h-5 bg-white/10" />

                {/* Avatar */}
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-emerald-400/50 shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-xs font-semibold text-zinc-900 border border-emerald-400/50 shrink-0">
                    {user?.email?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="text-white/40 text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/[0.07] transition-all duration-200 cursor-pointer bg-transparent"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white/60 hover:text-white hover:bg-white/[0.07] text-sm px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-emerald-400 text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 hover:-translate-y-px transition-all duration-200 whitespace-nowrap"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col gap-1 p-1 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-white/70 rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white/70 rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white/70 rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-white/[0.07] py-3 flex flex-col">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white hover:bg-white/[0.05] text-sm px-4 py-3 transition-all duration-200"
              >
                {label}
              </Link>
            ))}

            <div className="h-px bg-white/[0.07] my-2 mx-4" />

            {user ? (
              <>
                <span className="text-white/30 text-xs px-4 py-2 truncate">
                  {user?.email}
                </span>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-red-400/80 hover:text-red-400 text-sm px-4 py-3 text-left transition-colors duration-200 cursor-pointer bg-transparent border-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-white/60 hover:text-white text-sm px-4 py-3 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-emerald-400 hover:text-emerald-300 text-sm px-4 py-3 font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;