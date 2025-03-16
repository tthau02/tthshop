import React, { useEffect, useState } from 'react';
import instance from '../../config/axiosConfig';
import AddToCart from '../AddTocart';
import { Link } from 'react-router-dom';

interface RelatedProduct {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
  decsription: string;
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
    <section className="my-14">
      <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 8).map((item) => (
          <div key={item._id} className="border rounded-lg p-4 hover:shadow-lg transition">
            <Link to={`/products/${item._id}`}>
                <img
                src={item.thumbnail}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-3"
                />
            </Link>
            <p>{item.decsription}</p>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <div className='flex justify-between items-center mt-3'>
                <p className="text-red-500 font-semibold">{item.price.toLocaleString()}₫</p>
                <AddToCart productId={item._id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;