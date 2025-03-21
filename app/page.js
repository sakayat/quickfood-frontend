import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedRestaurants />
    </div>
  );
}
