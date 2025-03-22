"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import MenuItem from "@/components/MenuItem";
import { ArrowLeft } from "lucide-react";

const RestaurantMenuItemsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurantData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurant/${params.id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
      }

      const data = await response.json();
      setRestaurant(data);

      if (data) {
        setMenuItems(data.menus);
      } else {
        setMenuItems([]);
      }
    } catch (err) {
      console.error("Error fetching restaurant data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchRestaurantData();
    }
  }, [params.id, token]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-xl text-gray-600 mb-4">Restaurant not found</p>
          <button
            onClick={() => router.push("/restaurants")}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/restaurants/${params.id}`}
          className="inline-flex items-center text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Restaurant
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{restaurant.name} - Menu</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item) => <MenuItem key={item.id} item={item} />)
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-xl text-gray-500">
              No menu items available for this restaurant
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuItemsPage;
