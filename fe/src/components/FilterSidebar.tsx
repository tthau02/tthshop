import { useEffect, useState } from "react";
import { ICategory } from "../interfaces/category";
import IProduct from "../interfaces/products"; // Import interface sản phẩm
import instance from "../config/axiosConfig";

interface FilterSidebarProps {
  selectedCategory: ICategory | null;
  setSelectedCategory: (category: ICategory | null) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  setProducts: (products: IProduct[]) => void; // Thêm prop để truyền sản phẩm lên cha
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  setProducts, // Nhận prop từ cha
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await instance.get("/categores");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category: ICategory) => {
    setSelectedCategory(category);
    try {
      const res = await instance.get(`/categores/${category._id}`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      setProducts([]);
    }
  };

  return (
    <aside className="w-[250px] p-4 bg-white rounded-lg mt-7">
      <h4 className="text-lg font-bold text-gray-700 mb-3">Danh mục</h4>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer p-2 rounded-lg ${
              selectedCategory?._id === category._id
                ? "bg-red-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryClick(category)} // Gọi hàm mới
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
  );
};

export default FilterSidebar;
