import React, { useEffect, useState } from 'react';
import instance from '../config/axiosConfig';
import toast from 'react-hot-toast';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

// Định nghĩa các interface như cũ
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

  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const userId = user._id;

  // Hàm fetch giỏ hàng
  const fetchCart = async () => {
    try {
      const response = await instance.get<CartResponse>(`/cart/${userId}`);
      setCartData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải giỏ hàng');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // Hàm cập nhật số lượng
  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error('Số lượng phải lớn hơn 0');
      return;
    }
    try {
      await instance.put('/cart/update', {
        userId,
        productId,
        quantity: newQuantity,
      });
      fetchCart(); // Cập nhật danh sách giỏ hàng
      fetchCartCount(); 
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Không thể cập nhật số lượng');
    }
  };

  const removeCart = async (productId: string) => {
    toast(
      (t) => (
        <div>
          <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={async () => {
                try {
                  await instance.delete<CartResponse>(
                    `/cart/remove?userId=${userId}&productId=${productId}`
                  );
                  toast.dismiss(t.id);
                  toast.success('Xóa sản phẩm thành công!');
                  fetchCart();
                  fetchCartCount();
                } catch (err: any) {
                  toast.error(err.response?.data?.message || 'Không thể xóa sản phẩm');
                }
              }}
            >
              Có
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => toast.dismiss(t.id)}
            >
              Không
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Đang tải...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
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
      {'userId' in cartData.cart && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Thông tin khách hàng</h2>
          <p>Tên: {cartData.cart.userId.username}</p>
          <p>Email: {cartData.cart.userId.email}</p>
        </div>
      )}
      <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b">
          <div className="md:col-span-4">Sản phẩm</div>
          <div className="md:col-span-2 text-center">Giá</div>
          <div className="md:col-span-2 text-center">Số lượng</div>
          <div className="md:col-span-2 text-center">Tổng</div>
          <div className="md:col-span-2 text-center"></div>
        </div>
        {!Array.isArray(cartData.cart) &&
          cartData.cart.items.map((item) => (
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
              <div className="md:col-span-2 text-center flex items-center justify-center space-x-2">
                <button
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="md:col-span-2 text-center font-semibold">
                {(item.productId.price * item.quantity).toLocaleString()} VNĐ
              </div>
              <div className="md:col-span-2 text-center font-semibold">
                <button
                  className="p-2 bg-red-500 text-red-50 rounded-lg text-[15px] hover:bg-red-400"
                  onClick={() => removeCart(item.productId._id)}
                >
                  Xóa
                </button>
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