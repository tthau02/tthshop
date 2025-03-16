import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../CartContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItemCount } = useCart();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleOptionClick = (option: string) => {
    setIsDropdownOpen(false);
    if (option === "logout") {
      handleLogout();
    } else if (option === "profile") {
      navigate("/profile");
    } else if (option === "orders") {
      navigate("/orders");
    }
  };

  return (
    <header className="p-3 bg-black fixed top-0 left-0 w-full z-50">
      <div className="container max-w-[1300px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-[24px] uppercase font-bold text-red-600">TH</h1>
          <span className="text-[24px] font-bold text-orange-400">Shop</span>
        </Link>

        <nav className="flex flex-col items-center justify-center">
          <div className="ml-10 flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="p-2 text-[14px] rounded-l-lg w-[350px] bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="p-2 rounded-r-lg text-white bg-red-500 text-[14px] hover:bg-red-600 transition-colors">
              Search
            </button>
          </div>
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
              to="/sale"
              className="text-white text-[14px] hover:text-red-300 transition-colors"
            >
              Khuyến Mãi
            </NavLink>
            <NavLink
              to="/contact"
              className="text-white text-[14px] hover:text-red-300 transition-colors"
            >
              Liên Hệ
            </NavLink>
          </div>
        </nav>

        <div className="flex items-center space-x-4">
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
      </div>
    </header>
  );
};

export default Header;
