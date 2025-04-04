import { useState } from "react";
import toast from "react-hot-toast";
import instance from "../../../config/axiosConfig";

interface UpdateUserRoleModalProps {
  userId: string;
  currentRole: string;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const UpdateUserRoleModal: React.FC<UpdateUserRoleModalProps> = ({
  userId,
  currentRole,
  onClose,
  onUpdateSuccess,
}) => {
  const [newRole, setNewRole] = useState<string>(currentRole);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateRole = async () => {
    setLoading(true);
    try {
      await instance.put(`/users/${userId}`, {
        roles: newRole,
      });
      toast.success("Cập nhật vai trò thành công!");
      onUpdateSuccess();
      onClose();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể cập nhật vai trò"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Cập nhật vai trò</h3>
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateRole}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRoleModal;
