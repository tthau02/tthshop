import { FaTimes } from "react-icons/fa";

interface User {
  username: string;
  email: string;
  phone: string;
  address: string;
}

interface Product {
  name: string;
  price: number;
  thumbnail: string;
}

interface OrderItem {
  productId: Product;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  _id: string;
  userId: User;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  shippingAddress: ShippingAddress;
}

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
}) => {
  // Hàm chuyển đổi trạng thái sang tiếng Việt
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

  // Hàm chuyển đổi phương thức thanh toán sang tiếng Việt
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Chi tiết đơn hàng #{order._id}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">
            Thông tin giao hàng
          </h4>
          <div className="border rounded-md p-4 bg-gray-50">
            <p>
              <span className="font-medium">Họ tên:</span>{" "}
              {order.shippingAddress.fullName}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {order.shippingAddress.email}
            </p>
            <p>
              <span className="font-medium">Số điện thoại:</span>{" "}
              {order.shippingAddress.phone}
            </p>
            <p>
              <span className="font-medium">Địa chỉ:</span>{" "}
              {order.shippingAddress.address}
            </p>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">Sản phẩm</h4>
          <div className="border rounded-md p-4 bg-gray-50">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 mb-4 last:mb-0"
              >
                <img
                  src={item.productId.thumbnail}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.productId.name}</p>
                  <p className="text-gray-500">
                    Đơn giá: {item.price.toLocaleString()}đ
                  </p>
                  <p className="text-gray-500">Số lượng: {item.quantity}</p>
                  <p className="text-gray-700 font-medium">
                    Tổng: {(item.price * item.quantity).toLocaleString()}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-2">
            Thông tin đơn hàng
          </h4>
          <div className="border rounded-md p-4 bg-gray-50">
            <p>
              <span className="font-medium">Tổng tiền hàng:</span>{" "}
              {order.totalAmount.toLocaleString()}đ
            </p>
            <p>
              <span className="font-medium">Phí vận chuyển:</span>{" "}
              {order.shippingFee.toLocaleString()}đ
            </p>
            <p>
              <span className="font-medium">Tổng thanh toán:</span>{" "}
              {(order.totalAmount + order.shippingFee).toLocaleString()}đ
            </p>
            <p>
              <span className="font-medium">Phương thức thanh toán:</span>{" "}
              {getPaymentMethodLabel(order.paymentMethod)}
            </p>
            <p>
              <span className="font-medium">Trạng thái:</span>{" "}
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
            </p>
            <p>
              <span className="font-medium">Ngày đặt hàng:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
