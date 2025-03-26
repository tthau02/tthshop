import React from "react";
import {
  FaGift,
  FaHeadset,
  FaHeart,
  FaSignOutAlt,
  FaUserCircle,
  FaHistory,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "Trần Trung Hậu",
    username: "SNumber",
    avatar:
      "https://cdn.prod.website-files.com/6762119e1fbfb186d2174b6a/6762119e1fbfb186d2176e0f_5c915d05ec148771a3a24513_5c1bf665604ba4a0aebbbdc2_hypothesis.jpeg", // Thay bằng ảnh thực tế
    qrCode: "https://via.placeholder.com/150", // Thay bằng mã QR thực tế
    balance: "0đ",
    joinDate: "Tổng tiền tích lũy từ 01/01/2024",
    promotion:
      "Đăng ký S-Student/S-Teacher để nhận thêm ưu đãi tối 500k/sản phẩm.",
    info: "Cập nhật thông tin cá nhân và địa chỉ để cơ trải nghiệm đặt hàng nhanh và thuận tiện hơn.",
  };

  return (
    <div className="w-[1300px] m-auto mt-[7%] min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-md p-4">
        <div className="flex items-center mb-6">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-semibold text-purple-600">
              {user.name}
            </h2>
            <p className="text-gray-600 text-sm">{user.username}</p>
          </div>
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="edit-profile"
              className="flex items-center p-2 text-red-500 font-semibold bg-red-100 rounded"
            >
              <FaUserCircle className="w-5 h-5 mr-2" />
              Tài khoản của bạn
            </Link>
          </li>
          <li>
            <Link
              to="order-history"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <FaHistory className="w-5 h-5 mr-2" />
              Lịch sử mua hàng
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <FaGift className="w-5 h-5 mr-2" />
              Ưu đãi của bạn
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <FaHeadset className="w-5 h-5 mr-2" />
              Hỗ trợ
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <FaHeart className="w-5 h-5 mr-2" />
              Góp ý - Phản hồi
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              <FaSignOutAlt className="w-5 h-5 mr-2" />
              Thoát tài khoản
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
