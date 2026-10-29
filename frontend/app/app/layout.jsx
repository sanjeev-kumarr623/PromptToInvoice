"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AppShell from "@/components/AppShell";

export default function AppLayout({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <AppShell>{children}</AppShell>;
}
