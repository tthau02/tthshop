import { useEffect, useState } from "react";
import BannerSlider from "../components/ui/BannerSlider ";
import IProduct from "../interfaces/products";
import instance from "../config/axiosConfig";
import { Link } from "react-router-dom";
import AddToCart from "../components/common/AddTocart";
import Categories from "../components/Categories";
import banner2 from "../../public/image/banner2.jpg";
import banner3 from "../../public/image/banner3.jpg";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getNewProduct();
  }, []);

  const getNewProduct = async () => {
    const { data } = await instance.get(`/products?_page=1&_limit=10`);
    setProducts(data.docs);
  };

  return (
    <>
      <BannerSlider />

      <div className="container max-w-[1300px] mx-auto m-5">
        <h3 className="mb-3 font-semibold text-[22px] text-red-500">
          Danh mục nổi bật
        </h3>
        <Categories />
        <div className="h-[400px] flex items-center justify-center gap-7">
          <div className="relative w-[660px] h-[300px]">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={banner3}
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2">Macbook air M4</h2>
              <p className="mb-4 text-sm">
                Máy được trang bị chip M4 thế hệ mới nhất của Apple
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white text-[14px] py-2 px-4 rounded-lg transition-all duration-300">
                Mua ngay
              </button>
            </div>
          </div>
          <div className="relative w-[660px] h-[300px]">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={banner2}
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2">iPhone 16</h2>
              <p className="mb-4 text-sm">
                Trải nghiệm công nghệ vượt trội với iPhone 16 mới nhất.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white text-[14px] py-2 px-4 rounded-lg transition-all duration-300">
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        <h3 className="mb-3 font-semibold text-[22px] text-red-500">
          Sản phẩm mới nhất
        </h3>
        <div className="bg-white p-8 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((item) => {
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
        </div>
      </div>
    </>
  );
};

export default Home;
