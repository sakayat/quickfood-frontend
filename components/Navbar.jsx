"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setUser(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

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
            {user ? (
              <>
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
              <Link
                href="/login"
                className="items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
