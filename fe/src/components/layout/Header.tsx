import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Search from "../ui/Search";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItemCount } = useCart();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleOptionClick = (option: string) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (option === "logout") {
      handleLogout();
    } else if (option === "profile") {
      navigate("/profile");
    } else if (option === "orders") {
      navigate("profile/order-history");
    }
  };

  return (
    <header className="p-3 bg-black fixed top-0 left-0 w-full z-50">
      <div className="container max-w-[1300px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-[24px] uppercase font-bold text-red-600">TH</h1>
          <span className="text-[24px] font-bold text-orange-400">Shop</span>
        </Link>
        <nav className="hidden lg:flex flex-col items-center justify-center">
          <Search />
          <div className="flex items-center justify-center space-x-6 mt-2">
            <NavLink
              to="/"
              className="text-white text-[14px] hover:text-red-300 transition-colors"
            >
              Trang Chủ
            </NavLink>
            <NavLink
              to="/products"
              className="text-white text-[14px] hover:text-red-300 transition-colors"
            >
              Sản Phẩm
            </NavLink>
            <NavLink
              to="/policy"
              className="text-white text-[14px] hover:text-red-300 transition-colors"
            >
              Chính Sách
            </NavLink>
            <NavLink
              to="/blog"
              className="text-white text-[14px] hover:text-red-300 transition-colors"
            >
              Bài Viết
            </NavLink>
            <NavLink
              to="/contact"
              className="text-white text-[14px] hover:text-red-300 transition-colors"
            >
              Liên Hệ
            </NavLink>
          </div>
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <div className="flex bg-red-600 rounded-lg">
              <Link to="/login">
                <button className="text-white text-[14px] p-2 hover:bg-red-400 rounded-l-lg transition-colors">
                  Đăng Nhập
                </button>
              </Link>
              <Link to="/register">
                <button className="text-white text-[14px] p-2 hover:bg-red-400 rounded-r-lg transition-colors">
                  Đăng Ký
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-white hover:text-red-300 transition-colors"
              >
                <FaUser className="text-[18px]" />
                <span className="ml-2 text-[14px]">{user.username}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li
                      onClick={() => handleOptionClick("profile")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Thông tin cá nhân
                    </li>
                    <li
                      onClick={() => handleOptionClick("orders")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Lịch sử mua hàng
                    </li>
                    <li
                      onClick={() => handleOptionClick("logout")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <Link to="/cart" className="relative">
            <TiShoppingCart className="text-white text-[32px] hover:text-red-300 transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[12px] w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
        <button
          className="lg:hidden text-white text-[24px]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black px-4 py-6 flex flex-col space-y-4">
          <Search />
          <NavLink
            to="/"
            className="text-white text-[14px] hover:text-red-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Trang Chủ
          </NavLink>
          <NavLink
            to="/products"
            className="text-white text-[14px] hover:text-red-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sản Phẩm
          </NavLink>
          <NavLink
            to="/sale"
            className="text-white text-[14px] hover:text-red-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Khuyến Mãi
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white text-[14px] hover:text-red-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Liên Hệ
          </NavLink>
          {!user ? (
            <div className="flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full text-white text-[14px] p-2 bg-red-600 hover:bg-red-400 rounded-lg transition-colors">
                  Đăng Nhập
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full text-white text-[14px] p-2 bg-red-600 hover:bg-red-400 rounded-lg transition-colors">
                  Đăng Ký
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-white hover:text-red-300 transition-colors"
              >
                <FaUser className="text-[18px]" />
                <span className="ml-2 text-[14px]">{user.username}</span>
              </button>
              {isDropdownOpen && (
                <div className="w-full bg-gray-800 text-white rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li
                      onClick={() => handleOptionClick("profile")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Thông tin cá nhân
                    </li>
                    <li
                      onClick={() => handleOptionClick("orders")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Lịch sử mua hàng
                    </li>
                    <li
                      onClick={() => handleOptionClick("logout")}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
              <Link
                to="/cart"
                className="relative flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <TiShoppingCart className="text-white text-[32px] hover:text-red-300 transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 left-6 bg-red-600 text-white text-[12px] w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
                <span className="ml-2 text-white text-[14px]">Giỏ hàng</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
