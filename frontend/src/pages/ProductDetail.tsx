import { useEffect, useState } from "react";
import IProduct from "../interfaces/products";
import { useParams } from "react-router-dom";
import instance from "../config/axiosConfig";

const ProductDetail = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await instance(`/products/${id}`);
        setProduct(data);
        // const related = await instance(`/products`);
        // setRelatedProducts(related.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <section className="max-w-[1250px] mx-auto m-5 mt-[8%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
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

        {/* Details Section */}
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl text-red-500 font-semibold">{product.price}₫</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-600">
            <span className="font-semibold">Thương hiệu:</span> {product.brand}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Còn hàng:</span> {product.quantity}
          </p>
          {/* Quantity Selector */}
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
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600">
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 px-4 py-2 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-800">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Bình luận */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-6">Bình luận</h2>
        <form className="bg-gray-100 p-6 rounded-lg">
          <textarea
            rows={4}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Viết bình luận..."
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Đăng
          </button>
        </form>

        {/* Danh sách bình luận */}
        <div className="mt-6 space-y-4">
          <div className="flex gap-4 items-start bg-white p-4 rounded-lg shadow">
            <img
              className="w-12 h-12 rounded-full"
              src="https://via.placeholder.com/40"
              alt="User Avatar"
            />
            <div>
              <p className="font-semibold">Nguyễn Văn A</p>
              <p className="text-gray-500 text-sm">2 giờ trước</p>
              <p className="mt-2 text-gray-700">Sản phẩm rất tốt, tôi rất hài lòng!</p>
              <div className="mt-2 flex space-x-4 text-blue-500">
                <button className="hover:underline">Thích</button>
                <button className="hover:underline">Trả lời</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.slice(0, 4).map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-red-500 font-semibold">{item.price}₫</p>
            </div>
          ))}
        </div> */}
      </section>
    </section>
  );
};

export default ProductDetail;
