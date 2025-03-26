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
  return (
    <div className="w-[1300px] m-auto mt-[7%] min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-md p-4">
        <div className="flex items-center mb-6">
          <img src="" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h2 className="text-lg font-semibold text-purple-600">name</h2>
            <p className="text-gray-600 text-sm">username</p>
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
