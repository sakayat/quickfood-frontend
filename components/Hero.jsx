import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-900 text-white py-20 h-[60vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Great Food Nearby
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Order from your favorite local restaurants with fast delivery and
          excellent service.
        </p>
        <Link
          href="/restaurants"
          className="inline-block bg-white text-black font-medium py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    </div>
  );
};

export default Hero;
