import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaListAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons từ react-icons

const AdminLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-xl">
        <Link to="/" className="flex items-center justify-center py-2">
          <h1 className="text-[24px] uppercase font-bold text-red-600">TH</h1>
          <span className="text-[24px] font-bold text-orange-400">Shop</span>
        </Link>
        <nav className="mt-6 flex-grow px-4">
          <Link
            to="/admin"
            className="flex items-center py-2.5 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <FaTachometerAlt className="mr-3" /> Dashboard
          </Link>
          <Link
            to="categores"
            className="flex items-center py-2.5 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <FaListAlt className="mr-3" /> Categories
          </Link>
          <Link
            to="products"
            className="flex items-center py-2.5 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <FaBox className="mr-3" /> Products
          </Link>
          <Link
            to="users"
            className="flex items-center py-2.5 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <FaUsers className="mr-3" /> Users
          </Link>
          <Link
            to="orders"
            className="flex items-center py-2.5 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <FaShoppingCart className="mr-3" /> Orders
          </Link>
          <Link
            to="settings"
            className="flex items-center py-2.5 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
          >
            <FaCog className="mr-3" /> Settings
          </Link>
        </nav>
        <div className="p-6 bg-gray-950 border-t border-gray-700">
          <button className="w-full flex items-center justify-center py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-grow">
        {/* Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                  />
                </svg>
              </button>
            </div>
            <div
              className="relative"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-10 h-10 bg-gray-400 rounded-full cursor-pointer flex items-center justify-center text-white font-semibold">
                A
              </div>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <ul className="py-1">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
