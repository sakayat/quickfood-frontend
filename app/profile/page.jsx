"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import OrderHistory from "@/components/OrderHistory";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/profile/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          setUser(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No access token found. Please log in.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 space-y-3">
      <div className="max-w-3xl mx-auto py-8 px-6 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-black">
            Profile Information
          </h2>
          <Link
            href="/profile/update"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
          >
            Update Profile
          </Link>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-md text-back">First Name</p>
              <p className="text-sm text-gray-700">
                {user.first_name || "not provided"}
              </p>
            </div>
            <div>
              <p className="text-md text-back">Last Name</p>
              <p className="text-sm text-gray-700">
                {user.last_name || "not provided"}
              </p>
            </div>

            <div>
              <p className="text-md text-back">Email Address</p>
              <p className="text-sm text-gray-700">
                {user.email || "not provided"}
              </p>
            </div>

            <div>
              <p className="text-md text-back">Phone Number</p>
              <p className="text-sm text-gray-700">
                {user.phone_number || "not provided"}
              </p>
            </div>
            <div>
              <p className="text-md text-back">Address </p>
              <p className="text-sm text-gray-700">
                {user.address || "not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <OrderHistory />
    </div>
  );
};

export default ProfilePage;
