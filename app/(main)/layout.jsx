import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "../../components/Footer";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
