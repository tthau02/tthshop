import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateUserRoleModal from "./UpdateUserRoleModal";
import instance from "../../../config/axiosConfig";

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  roles: string;
  createdAt: string;
}

const UsersContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/users");
      setUsers(response.data.users);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy danh sách người dùng"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xóa người dùng
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    try {
      await instance.delete(`/users/${userId}`);
      toast.success("Xóa người dùng thành công!");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Không thể xóa người dùng");
    }
  };

  // Mở modal cập nhật vai trò
  const openUpdateModal = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  // Đóng modal cập nhật vai trò
  const closeUpdateModal = () => {
    setSelectedUser(null);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Quản lý người dùng
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Tên
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Số điện thoại
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Địa chỉ
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Vai trò
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Ngày tạo
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    Đang tải...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user._id}</td>
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">{user.address}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          user.roles === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.roles === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(user.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => openUpdateModal(user)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    Không có người dùng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal cập nhật vai trò */}
      {isUpdateModalOpen && selectedUser && (
        <UpdateUserRoleModal
          userId={selectedUser._id}
          currentRole={selectedUser.roles}
          onClose={closeUpdateModal}
          onUpdateSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default UsersContent;
