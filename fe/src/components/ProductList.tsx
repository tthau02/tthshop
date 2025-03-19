import IProduct from "../interfaces/products";
import { ICategory } from "../interfaces/category"; // Import interface danh mục
import ProductsItem from "../components/ProductsItem";

interface ProductListProps {
  products: IProduct[];
  searchQuery?: string;
  selectedCategory?: ICategory | null; // Thêm prop để nhận danh mục
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  searchQuery,
  selectedCategory,
}) => {
  return (
    <section className="w-[1000px]">
      <h4 className="p-2 my-3 text-center text-[18px] font-bold text-red-500">
        {searchQuery
          ? `Kết quả tìm kiếm cho "${searchQuery}"`
          : selectedCategory
          ? `Sản phẩm thuộc danh mục "${selectedCategory.categoryName}"`
          : "Tất cả sản phẩm"}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item) => <ProductsItem key={item._id} {...item} />)
        ) : (
          <p className="text-center text-gray-500">
            Không tìm thấy sản phẩm nào.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductList;
