import { useState, useEffect } from "react";
import instance from "../../config/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Order {
  _id: string;
  userId: string;
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const OrderHistoryContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCancelModalVisible, setIsCancelModalVisible] =
    useState<boolean>(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id;

  const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

  const fetchOrders = async () => {
    if (!userId || !isValidObjectId(userId)) {
      toast.error("Vui lòng đăng nhập hợp lệ để xem lịch sử đơn hàng");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await instance.get("orders/user", {
        params: { userId },
      });
      setOrders(response.data.orders);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy danh sách đơn hàng"
      );
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    if (!userId || !isValidObjectId(userId)) {
      toast.error("ID người dùng không hợp lệ");
      navigate("/login");
      return;
    }

    try {
      await instance.put(`orders/${orderId}/cancel`, { userId });
      toast.success("Hủy đơn hàng thành công!");
      fetchOrders();
      handleCancelModalClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi hủy đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipped: "Đã giao hàng",
      delivered: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      cod: "Thanh toán khi nhận hàng",
      vnpay: "VNPAY",
      wallet: "Ví điện tử",
    };
    return methodMap[method] || method;
  };

  const showCancelModal = (orderId: string) => {
    setOrderToCancel(orderId);
    setIsCancelModalVisible(true);
  };

  const handleCancelModalClose = () => {
    setIsCancelModalVisible(false);
    setOrderToCancel(null);
  };

  return (
    <div className="p-6 bg-white min-h-screen w-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Lịch sử đơn hàng
        </h2>
        {loading ? (
          <div className="text-center py-6 text-gray-600">Đang tải...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-6 text-gray-600">
            Không có đơn hàng nào
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Mã đơn hàng: {order._id}
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-medium">Ngày đặt:</span>{" "}
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Tổng tiền:</span>{" "}
                      {(order.totalAmount + order.shippingFee).toLocaleString()}
                      đ
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">
                        Phương thức thanh toán:
                      </span>{" "}
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Trạng thái:</span>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </p>
                  </div>
                  {(order.status === "pending" ||
                    order.status === "processing") && (
                    <button
                      onClick={() => showCancelModal(order._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Hủy đơn
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isCancelModalVisible && orderToCancel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Xác nhận hủy đơn hàng
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn hủy đơn hàng này?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelModalClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Không
                </button>
                <button
                  onClick={() => cancelOrder(orderToCancel)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Hủy đơn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryContent;
