import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Menu } from "antd";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="p-3 bg-black fixed top-0 left-0 w-full z-50">
      <div className="container max-w-[1300px] mx-auto flex justify-between items-center">
        <Link to="/" className="flex mt-1">
          <h1 className="text-[30px] uppercase font-bold text-red-600">TH</h1>
          <span className="text-[30px] font-bold text-orange-400">Shop</span>
        </Link>
        
        <nav className="flex flex-col items-center justify-center">
          <div className="ml-10">
            <input type="text" placeholder="Search" className="p-2 text-[14px] rounded-s-lg w-[350px]" />
            <button className="p-2 me-6 rounded-e-lg text-white bg-red-500 text-[14px] hover:bg-red-300">Search</button>
          </div>
            <div className="flex items-center justify-center space-x-4">
              <NavLink to="/" className="text-white hover:text-red-300 text-[14px]">Trang Chủ</NavLink>
              <NavLink to="/products" className="text-white hover:text-red-300 text-[14px]">Sản Phẩm</NavLink>
              <NavLink to="/sale" className="text-white hover:text-red-300 text-[14px]">Khuyến Mãi</NavLink>
              <NavLink to="/contact" className="text-white hover:text-red-300 text-[14px]">Liên Hệ</NavLink>
            </div>
        </nav>
        <div className="flex items-center">
          {!user ? (
            <div className="flex bg-red-600 rounded-lg">
              <Link to="/login">
                <button className="text-white text-[14px] p-2 hover:bg-red-400 rounded-s-lg">Đăng Nhập</button>
              </Link>
              <Link to="/register">
                <button className="text-white text-[14px] p-2 hover:bg-red-400 rounded-e-lg">Đăng Ký</button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-white flex items-center space-x-2 "><FaUser /> {user.username}</span>
              <button 
                onClick={handleLogout} 
                className="p-2 me-6 bg-red-600 text-white text-[14px] rounded-lg hover:bg-red-400">
                Đăng Xuất
              </button>
            </div>
          )}

            <div className="text-white text-[32px] ml-3">
             <Link to="/cart"><TiShoppingCart/></Link>
            </div>
        </div>
      </div>
      <Menu/>
    </div>
    
  );
};

export default Header;
