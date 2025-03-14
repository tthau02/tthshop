import React, { useEffect, useState } from 'react';
import instance from '../../config/axiosConfig';

interface RelatedProduct {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
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
    return <div className="text-center mt-10">Đang tải sản phẩm liên quan...</div>;
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((item) => (
          <div key={item._id} className="border rounded-lg p-4 hover:shadow-lg transition">
            <img
              src={item.thumbnail}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-red-500 font-semibold">{item.price.toLocaleString()}₫</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;