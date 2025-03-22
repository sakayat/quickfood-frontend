"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RestaurantsItem from "./RestaurantsItem";

const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurantsData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      console.log(data);
      

      setRestaurants(data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantsData();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading featured restaurants...</p>
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Restaurants</h2>
          <Link
            href="/restaurants"
            className="text-black font-medium hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((item) => (
            <RestaurantsItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
