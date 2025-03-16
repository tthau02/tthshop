import { useEffect, useState } from "react";
import IProduct from "../interfaces/products";
import ProductsItem from "../components/ProductsItem";
import instance from "../config/axiosConfig";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { ICategory } from "../interfaces/category";

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]); // Danh sách danh mục
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [priceRange, setPriceRange] = useState<number>(0); // Lọc giá
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    fetchCategories(); // Lấy danh mục
    fetchProducts(); // Lấy sản phẩm
  }, [currentPage, selectedCategory, priceRange]);

  const fetchCategories = async () => {
    const res = await instance.get("/categores");
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    let query = `/products?_page=${currentPage}&_limit=${limit}`;
    if (selectedCategory) query += `&category=${selectedCategory}`;
    if (priceRange > 0) query += `&price_lte=${priceRange}`;
    const res = await instance.get(query);
    setProducts(res.data.docs);
    setTotalPages(res.data.totalPages);
  };

  return (
    <div className="max-w-[1250px] mx-auto m-5 mt-[5%] flex">
      {/* Sidebar */}
      <aside className="w-[250px] p-4 bg-gray-100 rounded-lg">
        <h4 className="text-lg font-bold text-gray-700 mb-3">Danh mục</h4>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded-lg ${
                selectedCategory === category
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.categoryName}
            </li>
          ))}
        </ul>

        <h4 className="mt-4 text-lg font-bold text-gray-700 mb-3">
          Lọc theo giá
        </h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
        <p>Giá tối đa: {priceRange} $</p>
      </aside>

      {/* Danh sách sản phẩm */}
      <section className="w-[1000px] pl-6">
        <h4 className="p-2 text-center text-[24px] font-bold text-red-500">
          Tất cả sản phẩm
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item: IProduct) => (
            <ProductsItem key={item._id} {...item} />
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-10 mb-10">
          <nav className="flex items-center space-x-2">
            <button
              className={`px-4 py-2 text-gray-700 bg-slate-200 border border-gray-300 rounded-l ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <AiFillCaretLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 border ${
                  currentPage === index + 1
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={`px-4 py-2 text-gray-700 bg-slate-200 border border-gray-300 rounded-r ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <AiFillCaretRight />
            </button>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Products;
