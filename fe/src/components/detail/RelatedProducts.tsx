import React, { useEffect, useState } from "react";
import instance from "../../config/axiosConfig";
import AddToCart from "../common/AddTocart";
import { Link } from "react-router-dom";

interface RelatedProduct {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  quantity: number;
}

interface RelatedProductsProps {
  productId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await instance.get(`products/related/${productId}`);
        setRelatedProducts(response.data.relatedProducts || []);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm liên quan:", error);
        setLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center mt-10">Đang tải sản phẩm liên quan...</div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white p-8 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {relatedProducts.map((item) => {
        return (
          <div className="shadow-md rounded-tl-lg rounded-tr-lg p-3 hover:border-red-600 transition-all duration-300 relative group border border-transparent">
            <Link to={`/products/${item._id}`}>
              <img
                className="w-full h-48 object-cover rounded-md mb-3"
                src={item.thumbnail}
                alt={item.name}
              />
            </Link>
            <div className="p-2">
              <Link to={`/products/${item._id}`}>
                <h3 className="font-semibold text-gray-800 ">{item.name}</h3>
              </Link>
              <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-red-500">
                  {item.price.toLocaleString()}₫
                </span>
                <span className="text-sm text-red-500">
                  Còn hàng: {item.quantity}
                </span>
              </div>
            </div>
            <div className="absolute left-0 right-0 bottom-[-2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
              <AddToCart productId={item._id} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default RelatedProducts;
