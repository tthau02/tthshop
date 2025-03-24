import React, { useEffect, useState } from "react";
import instance from "../config/axiosConfig";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

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

interface CartResponse {
  cart: Cart | [];
  totalAmount?: number;
  message?: string;
}

const PageCart: React.FC = () => {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchCartCount } = useCart();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user._id;

  const fetchCart = async () => {
    try {
      const response = await instance.get<CartResponse>(`/cart/${userId}`);
      setCartData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải giỏ hàng");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Số lượng phải lớn hơn 0");
      return;
    }
    try {
      await instance.put("/cart/update", {
        userId,
        productId,
        quantity: newQuantity,
      });
      fetchCart();
      fetchCartCount();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể cập nhật số lượng");
    }
  };

  const removeCart = async (productId: string) => {
    if (!userId) {
      toast.error("Vui lòng đăng nhập để xóa sản phẩm");
      return;
    }

    try {
      await instance.delete<CartResponse>(
        `/cart/remove?userId=${userId}&productId=${productId}`
      );
      toast.success("Xóa sản phẩm thành công!");
      fetchCart();
      fetchCartCount();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Không thể xóa sản phẩm");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (
    !cartData ||
    (Array.isArray(cartData.cart) && cartData.cart.length === 0)
  ) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
        <p className="text-gray-600">Giỏ hàng hiện đang trống</p>
      </div>
    );
  }

  return (
    <div className="max-w-[750px] mx-auto m-5 mt-[110px] px-4 py-8 ">
      <h3 className="text-xl font-bold mb-6">Giỏ hàng của bạn</h3>
      {"userId" in cartData.cart && (
        <div className="mb-6 bg-white p-4 rounded-lg">
          <h4 className="font-semibold">Thông tin khách hàng</h4>
          <p>Tên: {cartData.cart.userId.username}</p>
          <p>Email: {cartData.cart.userId.email}</p>
        </div>
      )}

      {!Array.isArray(cartData.cart) &&
        cartData.cart.items.map((item) => (
          <div className="shadow-sm bg-white rounded-lg mb-4">
            <div key={item.productId._id} className="flex justify-between">
              <div className="flex justify-start p-3">
                <input type="radio" className="w-4 mb-[60px] mr-2" />
                <img
                  src={item.productId.thumbnail}
                  alt={item.productId.name}
                  className="w-24 h-25 object-cover mr-4 rounded"
                />
                <div className="ml-7">
                  <h4 className="text-[18px] font-medium text-gray-600">
                    {item.productId.name}
                  </h4>
                  <div className="mt-4">
                    <span className="text-[17px] text-red-500 font-medium">
                      {item.productId.price.toLocaleString()}
                    </span>
                    <del className="ml-3 text-gray-500">1000</del>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-5">
                <div className="flex justify-end">
                  <button
                    className=""
                    onClick={() => removeCart(item.productId._id)}
                  >
                    <FaRegTrashCan />
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-5">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() =>
                      updateQuantity(item.productId._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-5 mt-3">
              <div className="flex items-center ml-4">
                <IoShieldCheckmarkOutline />
                <Link to="" className="text-[15px] font-normal ml-3">
                  Bảo vệ toàn diện với bản hành mở rộng
                </Link>
              </div>
              <div>
                <Link to="" className="text-[15px] font-medium text-red-500">
                  Chọn gói
                </Link>
              </div>
            </div>
          </div>
        ))}
      {cartData.totalAmount && (
        <div className="shadow-sm bg-white rounded-lg p-5">
          <div className="flex justify-between items-center">
            <p className="text-[17px] font-semibold">
              Tạm tính:{" "}
              <span className="text-[17px] text-red-600 font-semibold">
                {cartData.totalAmount.toLocaleString()}đ
              </span>
            </p>
            <div>
              <Link
                to="/checkout"
                state={{
                  cart: cartData.cart,
                  totalAmount: cartData.totalAmount,
                }}
              >
                <button className=" bg-red-500 text-white px-5 py-3 text-[14px] rounded hover:bg-red-600 transition-colors">
                  Mua ngay
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageCart;
