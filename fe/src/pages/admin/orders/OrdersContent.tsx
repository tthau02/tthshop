import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaFilter } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateOrderStatusModal from "./UpdateOrderStatusModal";
import OrderDetailModal from "./OrderDetailModal";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
}

interface OrderItem {
  productId: Product;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: User | null; // userId có thể là null
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  limit: number;
}

const OrdersContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    limit: 5,
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(
    null
  );

  const fetchOrders = async (status: string, page: number) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/orders", {
        params: {
          status: status === "all" ? undefined : status,
          page,
          limit: pagination.limit,
        },
      });

      const { orders, pagination: paginationData } = response.data;
      setOrders(orders);
      setPagination(paginationData);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy danh sách đơn hàng"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async (orderId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/orders/${orderId}`
      );
      const { order } = response.data;
      setSelectedOrderDetail(order);
      setIsDetailModalOpen(true);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Không thể lấy chi tiết đơn hàng"
      );
    }
  };

  useEffect(() => {
    fetchOrders(filterStatus, currentPage);
  }, [filterStatus, currentPage]);

  const openUpdateModal = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedOrder(null);
    setIsUpdateModalOpen(false);
  };

  const openDetailModal = (orderId: string) => {
    fetchOrderDetail(orderId);
  };

  const closeDetailModal = () => {
    setSelectedOrderDetail(null);
    setIsDetailModalOpen(false);
  };

  const handleUpdateSuccess = () => {
    fetchOrders(filterStatus, currentPage);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đã giao hàng";
      case "delivered":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "vnpay":
        return "VNPAY";
      case "wallet":
        return "Ví điện tử";
      default:
        return method;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-500 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đã giao hàng</option>
                <option value="delivered">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Mã đơn hàng
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Khách hàng
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Tổng tiền
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Phương thức
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Trạng thái
                </th>
                <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                  Ngày đặt
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
                    colSpan={7}
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    Đang tải...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{order._id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">
                          {order.userId
                            ? order.userId.username
                            : "Không xác định"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {order.userId ? order.userId.email : "Không có email"}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {(order.totalAmount + order.shippingFee).toLocaleString()}
                      đ
                    </td>
                    <td className="py-3 px-4">
                      {getPaymentMethodLabel(order.paymentMethod)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "shipped"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <button
                        onClick={() => openDetailModal(order._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => openUpdateModal(order)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-3 px-4 text-center text-gray-500"
                  >
                    Không có đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-600">
              Hiển thị {(pagination.currentPage - 1) * pagination.limit + 1} -{" "}
              {Math.min(
                pagination.currentPage * pagination.limit,
                pagination.totalOrders
              )}{" "}
              trong số {pagination.totalOrders} đơn hàng
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Trước
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pagination.totalPages)
                  )
                }
                disabled={currentPage === pagination.totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === pagination.totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {isUpdateModalOpen && selectedOrder && (
        <UpdateOrderStatusModal
          orderId={selectedOrder._id}
          currentStatus={selectedOrder.status}
          onClose={closeUpdateModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {isDetailModalOpen && selectedOrderDetail && (
        <OrderDetailModal
          order={selectedOrderDetail}
          onClose={closeDetailModal}
        />
      )}
    </div>
  );
};

export default OrdersContent;
