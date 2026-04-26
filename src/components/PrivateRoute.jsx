"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  // 🔄 While checking auth
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // ❌ Not logged in → nothing (redirect will happen)
  if (!user) {
    return null;
  }

  // ✅ Logged in
  return children;
}