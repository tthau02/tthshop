import { useEffect, useState } from "react"
import BannerSlider from "../components/BannerSlider "
import IProduct from "../interfaces/products"
import instance from "../config/axiosConfig";
import { Link } from "react-router-dom";
import { ICategory } from "../interfaces/category";
import AddToCart from "../components/AddTocart";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    getNewProduct();
    getCategory();
  }, [])

  const getNewProduct = async () => {
    const {data} = await instance.get(`/products?_page=1&_limit=8`);
    setProducts(data.docs);
  }

  const getCategory = async() => {
    const {data} = await instance.get(`/categores`);
    setCategory(data);
  }
  return (
  <>
    <BannerSlider />

    <div className="container max-w-[1300px] mx-auto m-5">
      <h3 className="mb-3 uppercase font-bold text-[16px] text-red-600">Danh Mục Nổi Bật</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {category.map((cate) => {
          return (
            <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
              <img className="w-full h-48 object-cover " src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/phone_cate_c6a412f60a.png" alt="Product Image" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 text-center">{cate.categoryName}</h2>
              </div>
            </div>
          )
        })}
       
      </div>
      <div className="h-[400px] flex items-center justify-center gap-7">
        <div className="relative w-[660px] h-[350px]">
          <img className="w-full h-full object-cover rounded-lg" src="https://www.apple.com/v/iphone-16/c/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png?202411071254"/>
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-2xl font-bold mb-2">iPhone 16</h2>
            <p className="mb-4 text-sm">Trải nghiệm công nghệ vượt trội với iPhone 16 mới nhất.</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              Mua ngay
            </button>
          </div>
        </div>
        <div className="relative w-[660px] h-[350px]">
          <img className="w-full h-full object-cover rounded-lg" src="https://www.apple.com/v/iphone-16/c/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png?202411071254" />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-2xl font-bold mb-2">iPhone 16</h2>
            <p className="mb-4 text-sm">Trải nghiệm công nghệ vượt trội với iPhone 16 mới nhất.</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
  
      <h3 className="mb-3 uppercase font-bold text-[16px] text-red-600">sản phẩm mới nhất</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => {
            return (
              <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
              <Link to={`/products/${item._id}`}>
              <img className="w-full h-48 object-cover" src={item.thumbnail} alt={item.name} />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 ">{item.name}</h2>
                <p className="mt-2 text-gray-600 text-sm">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-red-500">${item.price}</span>
                  <AddToCart productId={item._id}/>
                </div>
              </div>
            </div>
            )
          })}
      </div>
    </div>

  </>
  )
}

export default Home