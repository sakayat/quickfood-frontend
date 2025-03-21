import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Restaurant Dashboard</h1>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-500 hover:text-gray-700">
              View Site
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
