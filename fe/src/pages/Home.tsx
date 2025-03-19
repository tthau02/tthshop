import { useEffect, useState } from "react";
import BannerSlider from "../components/ui/BannerSlider ";
import IProduct from "../interfaces/products";
import instance from "../config/axiosConfig";
import { Link } from "react-router-dom";
import AddToCart from "../components/common/AddTocart";
import Categories from "../components/Categories";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getNewProduct();
  }, []);

  const getNewProduct = async () => {
    const { data } = await instance.get(`/products?_page=2&_limit=8`);
    setProducts(data.docs);
  };

  return (
    <>
      <BannerSlider />

      <div className="container max-w-[1300px] mx-auto m-5">
        <h3 className="mb-3 uppercase font-bold text-[16px] text-red-600">
          Danh Mục Nổi Bật
        </h3>
        <Categories />
        <div className="h-[400px] flex items-center justify-center gap-7">
          <div className="relative w-[660px] h-[300px]">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://nylon.com.sg/wp-content/uploads/2025/03/MacBook-Air-M4-NYLON-Banner-scaled.jpg"
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2">Macbook air M4</h2>
              <p className="mb-4 text-sm">
                Máy được trang bị chip M4 thế hệ mới nhất của Apple
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                Mua ngay
              </button>
            </div>
          </div>
          <div className="relative w-[660px] h-[300px]">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="https://medialab.com.vn/wp-content/uploads/2024/09/iphone-16-Pro-Max-Media-LAB-cover.jpg"
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2">iPhone 16</h2>
              <p className="mb-4 text-sm">
                Trải nghiệm công nghệ vượt trội với iPhone 16 mới nhất.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        <h3 className="mb-3 uppercase font-bold text-[16px] text-red-600">
          sản phẩm mới nhất
        </h3>
        <div className="bg-white p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => {
            return (
              <div className="rounded-lg p-4 shadow-sm hover:shadow-lg transition">
                <Link to={`/products/${item._id}`}>
                  <img
                    className="w-full h-48 object-cover rounded-md mb-3"
                    src={item.thumbnail}
                    alt={item.name}
                  />
                </Link>
                <div className="p-2">
                  <Link to={`/products/${item._id}`}>
                    <h3 className="font-semibold text-gray-800 ">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="mt-2 text-gray-600 text-sm">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-red-500">
                      {item.price.toLocaleString()}₫
                    </span>
                    <AddToCart productId={item._id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
