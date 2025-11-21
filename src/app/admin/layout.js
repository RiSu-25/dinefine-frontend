"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import "./admin.css";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    // Allow access only to /admin/login without auth
    if (!isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  // If on login page, don't show sidebar/topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-body flex h-screen text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
