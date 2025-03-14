import React, { useEffect, useState } from 'react';
import instance from '../config/axiosConfig';
import { Link } from 'react-router-dom';

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

interface User {
    _id: string;
    username: string;
    email: string;
  }

interface Cart {
  _id: string;
  userId: User;
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

  // Giả sử userId được lấy từ context hoặc props
  const user = JSON.parse(localStorage.getItem("user")); // Parse chuỗi JSON từ localStorage
      if (!user || !user._id) {
        throw new Error("User ID not found");
      }
      const userId = user._id; // Lấy _id từ object user

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await instance.get<CartResponse>(
          `/cart/${userId}`
        );
        setCartData(response.data);
      } catch (err) {
        setError('Không thể tải giỏ hàng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const removeCart = async (productId: string) => {
    try {
      const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
      if (!isConfirmed) {
        return;
      }
      const response = await instance.post<CartResponse>('/cart/remove', {
        userId,
        productId,
      });
      setCartData(response.data);
    } catch (err) {
      setError('Không thể xóa sản phẩm khỏi giỏ hàng');
      console.error('Lỗi khi xóa sản phẩm:', err);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!cartData || (Array.isArray(cartData.cart) && cartData.cart.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
        <p className="text-gray-600">Giỏ hàng hiện đang trống</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto m-5 mt-[80px] px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      
      {/* Thông tin người dùng */}
      {'userId' in cartData.cart && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Thông tin khách hàng</h2>
          <p>Tên: {cartData.cart.userId.username}</p>
          <p>Email: {cartData.cart.userId.email}</p>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b">
          <div className="md:col-span-4">Sản phẩm</div>
          <div className="md:col-span-2 text-center">Giá</div>
          <div className="md:col-span-2 text-center">Số lượng</div>
          <div className="md:col-span-2 text-center">Tổng</div>
          <div className="md:col-span-2 text-center"></div>
        </div>

        {!Array.isArray(cartData.cart) && cartData.cart.items.map((item) => (
          <div
            key={item.productId._id}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center"
          >
            <div className="md:col-span-4 flex items-center">
              <img
                src={item.productId.thumbnail}
                alt={item.productId.name}
                className="w-16 h-16 object-cover mr-4 rounded"
              />
              <span>{item.productId.name}</span>
            </div>
            <div className="md:col-span-2 text-center">
              {item.productId.price.toLocaleString()} VNĐ
            </div>
            <div className="md:col-span-2 text-center">
              {item.quantity}
            </div>
            <div className="md:col-span-2 text-center font-semibold">
              {(item.productId.price * item.quantity).toLocaleString()} VNĐ
            </div>
            <div className='md:col-span-2 text-center font-semibold'>
                <button className='p-2 bg-red-500 text-red-50 rounded-lg text-[15px] hover:bg-red-400' onClick={()=> removeCart(item.productId._id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {/* Tổng cộng */}
      {cartData.totalAmount && (
        <div className="mt-6 text-right">
          <div className="bg-gray-100 p-4 rounded-lg inline-block">
            <p className="text-lg font-semibold">
              Tổng cộng:{' '}
              <span className="text-xl text-blue-600">
                {cartData.totalAmount.toLocaleString()} VNĐ
              </span>
            </p>
            <Link to="/products" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors mr-7">
                Tiếp tục mua hàng
            </Link>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageCart;