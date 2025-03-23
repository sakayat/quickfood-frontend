import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-300">
          <div>
            <h3 className="text-xl font-bold mb-4">QuickFood</h3>
            <p className="">
              Order your favorite food from the best restaurants in your area.
            </p>
          </div>

          <div className="text-gray-300">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="hover:text-white">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white">
                  Menu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Refund Policy</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Email: support@quickfood.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            © {currentYear} QuickFood. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
