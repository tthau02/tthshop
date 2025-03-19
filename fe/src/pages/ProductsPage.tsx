import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import IProduct from "../interfaces/products";
import { ICategory } from "../interfaces/category";
import instance from "../config/axiosConfig";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [priceRange, setPriceRange] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const limit = 12;

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    const categoryId = params.get("categoryId") || "";
    setSearchQuery(q);
    setCurrentPage(1);

    if (categoryId) {
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts();
    }
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("categoryId") || "";
    if (categoryId) {
      fetchProductsByCategory(categoryId);
    } else {
      fetchProducts();
    }
  }, [currentPage, priceRange]);

  const fetchProducts = async () => {
    let query = `/products?_page=${currentPage}&_limit=${limit}`;
    if (selectedCategory) query += `&category=${selectedCategory._id}`;
    if (priceRange > 0) query += `&price_lte=${priceRange}`;
    if (searchQuery) query += `&q=${encodeURIComponent(searchQuery)}`;
    const res = await instance.get(query);
    setProducts(res.data.products || res.data.docs || []);
    setTotalPages(res.data.totalPages || 1);
  };

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      const res = await instance.get(
        `/categores/${categoryId}?_page=${currentPage}&_limit=${limit}`
      );
      setProducts(res.data.products || []);
      setSelectedCategory(res.data.category);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
      setProducts([]);
      setTotalPages(1);
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto m-5 mt-[5%] flex">
      <FilterSidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        setProducts={setProducts}
      />
      <div className="flex-1 bg-white p-5 rounded-lg mt-8 ml-6">
        <ProductList
          products={products}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
