"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Menu as MenuIcon,
  PlusCircle,
  Tag,
  BookOpen,
  Store,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navigation = [

    { name: "Restaurants", href: "/dashboard/restaurants", icon: Store },
    { name: "Add Menu Item", href: "/dashboard/menu-items/add", icon: PlusCircle },
    { name: "View Menu Items", href: "/dashboard/menu-items", icon: MenuIcon },
    { name: "All Orders", href: "/dashboard/orders", icon: ShoppingBag },
  ];

  return (
    <div
      className={`w-64 h-full flex flex-col bg-gray-800 text-white transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <div className="flex items-center">
          <span className="text-xl font-semibold">QuickFood</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-5 px-2 py-2 text-sm font-medium rounded-md ${
                isActive(item.href)
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              <item.icon className={`h-5 w-5`} />
              {<span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
