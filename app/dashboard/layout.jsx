"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, userRole, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (userRole !== "restaurant_owner") {
        router.push("/profile");
      }
    }
  }, [isAuthenticated, userRole, loading, router]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
