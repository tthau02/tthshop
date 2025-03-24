import { FaShoppingCart } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
  stock: number;
}

interface CartItem {
  productId: Product;
  quantity: number;
}

interface Cart {
  _id: string;
  userId: { _id: string; username: string; email: string };
  items: CartItem[];
}

interface OrderSummaryProps {
  cart: Cart;
  totalAmount: number;
  shippingFee: number;
  finalTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  totalAmount,
  shippingFee,
  finalTotal,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FaShoppingCart className="w-5 h-5 mr-2 text-gray-600" />
        Thông tin đơn hàng
      </h2>
      <div className="border rounded-lg p-4">
        {cart.items.length > 0 ? (
          cart.items.map((item: CartItem) => (
            <div
              key={item.productId._id}
              className="flex justify-between  mb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productId.thumbnail}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="">
                  <p className="font-medium">{item.productId.name}</p>
                  <p className="text-gray-600">Số lượng: {item.quantity}</p>
                  <p className="text-gray-600">Giá: {item.productId.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="">
                  Tổng:{" "}
                  {(item.productId.price * item.quantity).toLocaleString()}đ
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Giỏ hàng trống</p>
        )}

        {/* Tổng tiền */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Tạm tính:</p>
            <p className="font-semibold">{totalAmount.toLocaleString()}đ</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-gray-600">Phí vận chuyển:</p>
            <p className="font-semibold">{shippingFee.toLocaleString()}đ</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-lg font-semibold">Tổng cộng:</p>
            <p className="text-lg font-semibold text-red-600">
              {finalTotal.toLocaleString()}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
