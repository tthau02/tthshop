import { useState } from "react";
import toast from "react-hot-toast";
import instance from "../../../config/axiosConfig";

interface UpdateOrderStatusModalProps {
  orderId: string;
  currentStatus: string;
  onClose: () => void;
  onUpdateSuccess: () => void; // Callback để làm mới danh sách đơn hàng
}

const UpdateOrderStatusModal: React.FC<UpdateOrderStatusModalProps> = ({
  orderId,
  currentStatus,
  onClose,
  onUpdateSuccess,
}) => {
  const [newStatus, setNewStatus] = useState<string>(currentStatus);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      const response = await instance.put(`/orders/${orderId}`, {
        status: newStatus,
      });

      toast.success(response.data.message || "Cập nhật trạng thái thành công!");
      onUpdateSuccess(); // Gọi callback để làm mới danh sách
      onClose(); // Đóng modal
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể cập nhật trạng thái"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          Cập nhật trạng thái đơn hàng
        </h3>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Trạng thái
          </label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipped">Đã giao hàng</option>
            <option value="delivered">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateStatus}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white transition-colors ${
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

export default UpdateOrderStatusModal;
