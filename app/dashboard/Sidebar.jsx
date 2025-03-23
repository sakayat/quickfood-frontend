"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  ShoppingBag,
  Menu as MenuIcon,
  PlusCircle,
  Store,
  Home,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsAuthenticated } = useAuth();

  const isActive = (path) => pathname === path;

  const navigation = [
    { name: "Restaurants", href: "/dashboard/restaurants", icon: Store },
    {
      name: "Add Menu Item",
      href: "/dashboard/menu-items/add",
      icon: PlusCircle,
    },
    { name: "View Menu Items", href: "/dashboard/menu-items", icon: MenuIcon },
    { name: "All Orders", href: "/dashboard/orders", icon: ShoppingBag },
  ];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

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
      <div className="border-t border-gray-700 p-4">
        <Link
          href="/"
          className="flex items-center gap-5 px-2 py-2 text-sm font-medium rounded-md text-gray-400 hover:bg-gray-700 mb-2"
        >
          <Home className="h-5 w-5" />
          <span>Visit Homepage</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-5 w-full px-2 py-2 text-sm font-medium rounded-md text-gray-400 hover:bg-gray-700"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
