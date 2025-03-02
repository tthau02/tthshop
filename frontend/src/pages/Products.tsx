import { useEffect, useState } from "react";
import IProduct from "../interfaces/products";
import ProductsItem from "../components/ProductsItem";
import instance from "../config/axiosConfig";

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const productsPerPage = 8;

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await instance.get(`/products?title=${searchTerm}`); 
      setProducts(res.data);
    };
    getAllProducts();
  }, [searchTerm]); 

  // Tính toán các chỉ số cho phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Tạo mảng số trang
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <section className='max-w-[1250px] mx-auto m-5 mt-[5%]'>
        <h4 className="p-2 text-center text-[24px] font-bold text-red-500">
          Tất cả sản phẩm
        </h4>
        
        <h4>Tìm kiếm sản phẩm</h4>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-[250px] p-2 border border-gray-300 rounded"
          />
          <button className="p-2 bg-red-600 text-white hover:bg-red-800">Search</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((item: IProduct) => (
            <ProductsItem key={item._id} {...item} />
          ))}
        </div>
      </section>

      {totalPages > 1 && (
        <div className="p-3 mt-8 mx-auto w-fit">
          <nav aria-label="Pagination" className="flex items-center space-x-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => {
                  setCurrentPage(number);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1 border border-gray-300 rounded ${
                  currentPage === number
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'hover:bg-gray-200'
                }`}
              >
                {number}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Products;
