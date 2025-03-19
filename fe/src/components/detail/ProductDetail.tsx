import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../config/axiosConfig";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
  images: string[];
  description: string;
  brand: string;
  quantity: number;
  categoryId: string;
}

const ProductDetail = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { fetchCartCount } = useCart();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await instance.get(`/products/${id}`);
        const productData = data.product || data;

        setProduct(productData);
        setLoading(false);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Lỗi khi lấy sản phẩm";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user || !user._id) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        setIsAddingToCart(false);
        return;
      }
      const userId = user._id;
      if (!product) {
        toast.error("Sản phẩm không tồn tại");
        setIsAddingToCart(false);
        return;
      }
      if (quantity <= 0) {
        toast.error("Số lượng phải lớn hơn 0");
        setIsAddingToCart(false);
        return;
      }

      if (quantity > product.quantity) {
        toast.error(`Số lượng vượt quá tồn kho (${product.quantity} sản phẩm)`);
        setIsAddingToCart(false);
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
      const errorMessage =
        error.response?.data?.message || "Lỗi khi thêm vào giỏ hàng";
      toast.error(errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % product.images.length
        );
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [product]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Sản phẩm không tồn tại
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md max-w-[1300px] mx-auto m-5 mt-[8%] flex p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          {product.images && product.images.length > 0 && (
            <div className="w-[550px] rounded-lg relative">
              <img
                src={product.images[currentImageIndex]}
                alt={`Slide ${currentImageIndex}`}
                className="w-full h-[340px] object-cover rounded-lg shadow-md"
              />
              <button
                onClick={() =>
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
                  )
                }
                className="absolute top-[170px] left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
              >
                <AiFillCaretLeft />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    (prevIndex) => (prevIndex + 1) % product.images.length
                  )
                }
                className="absolute right-2 top-[170px] transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
              >
                <AiFillCaretRight />
              </button>
              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`w-16 h-16 rounded-lg border cursor-pointer object-cover transition-all ${
                      currentImageIndex === index
                        ? "border-blue-500 border-2"
                        : "border-gray-300"
                    }`}
                    onClick={() => goToImage(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl text-red-500 font-semibold">
            {product.price.toLocaleString()}₫
          </p>
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
              disabled={isAddingToCart}
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-300 rounded-lg"
              onClick={() =>
                setQuantity((q) => Math.min(product.quantity, q + 1))
              }
              disabled={isAddingToCart}
            >
              +
            </button>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              className="flex-1 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
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
