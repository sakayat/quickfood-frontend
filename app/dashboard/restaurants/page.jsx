"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, PlusCircle, Book } from "lucide-react";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }

      const data = await response.json();
      setRestaurants(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this restaurant?")) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/delete-restaurant/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete restaurant");
      }

      fetchRestaurants();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Restaurants</h1>
        <Link
          href="/dashboard/restaurants/add"
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          <PlusCircle size={18} />
          <span>Add Restaurant</span>
        </Link>
      </div>

      {restaurants.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">No restaurants found</p>
          <Link
            href="/dashboard/restaurants/add"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Add Your Restaurant
          </Link>
        </div>
      ) : (
        <div className="w-full">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-3">{restaurant.description}</p>
                <p className="text-gray-500 text-sm mb-4">
                  <span className="font-medium">Location:</span>{" "}
                  {restaurant.location}
                </p>
                <div className="flex flex-wrap justify-end mt-4 gap-4">
                  <Link
                    href={`/dashboard/restaurants/edit/${restaurant.id}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(restaurant.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage; 