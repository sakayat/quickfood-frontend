"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();
  const { cartItems } = useCart();

  const countItem = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const role = localStorage.getItem("user_role");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-5">
            <Link href={"/"} className="font-bold text-xl text-black">
              QuickFood
            </Link>
            <ul className="flex items-center gap-5">
              <Link href="/">Home</Link>
              <Link href="/restaurants">Restaurants</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/about">About Us</Link>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {countItem > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {countItem}
                    </span>
                  )}
                </Link>
                {role === "restaurant_owner" && (
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-5">
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {countItem > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {countItem}
                    </span>
                  )}
                </Link>
                <Link
                  href="/login"
                  className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
