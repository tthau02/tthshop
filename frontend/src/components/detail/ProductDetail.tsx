import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../config/axiosConfig";
import { useCart } from '../../CartContext';
import toast from "react-hot-toast";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  brand: string;
  quantity: number;
  categoryId: string;
}

const ProductDetail = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const { id } = useParams<{ id: string }>();
  const { fetchCartCount } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data.product || data);
        setLoading(false);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Lỗi khi lấy sản phẩm';
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user || !user._id) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        return;
      }
      const userId = user._id;

      if (!product) {
        toast.error("Sản phẩm không tồn tại");
        return;
      }

      if (quantity > product.quantity) {
        toast.error("Số lượng vượt quá tồn kho");
        return;
      }

      await instance.post("/cart", {
        userId,
        productId: id,
        quantity,
      });
      toast.success("Thêm vào giỏ hàng thành công!");
      fetchCartCount();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Lỗi khi thêm vào giỏ hàng');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Đang tải...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Sản phẩm không tồn tại</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="flex flex-col items-center">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-[450px] h-auto rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
          <div className="flex gap-2 mt-4">
            <img src={product.thumbnail} className="w-16 h-16 rounded-lg border cursor-pointer" />
            <img src={product.thumbnail} className="w-16 h-16 rounded-lg border cursor-pointer" />
            <img src={product.thumbnail} className="w-16 h-16 rounded-lg border cursor-pointer" />
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl text-red-500 font-semibold">{product.price.toLocaleString()}₫</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Thương hiệu:</span> {product.brand}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Còn hàng:</span> {product.quantity}
          </p>
          <div className="flex items-center space-x-4">
            <p className="font-semibold">Số lượng:</p>
            <button
              className="px-3 py-1 bg-gray-300 rounded-lg"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-300 rounded-lg"
              onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
            >
              +
            </button>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className="flex-1 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 px-4 py-2 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-800">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;