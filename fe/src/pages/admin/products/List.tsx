import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IProduct from "../../../interfaces/products";
import toast from "react-hot-toast";
import instance from "../../../config/axiosConfig";
import { AxiosError } from "axios";
import { AiOutlineClose, AiFillEdit } from "react-icons/ai";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu giá trị tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]); // State để lưu danh sách sản phẩm đã lọc

  // Fetch danh sách sản phẩm từ API
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await instance.get("/products?_page=1&_limit=10");
        console.log(res.data.docs);
        setProducts(res.data.docs);
        setFilteredProducts(res.data.docs); // Khởi tạo danh sách lọc ban đầu
      } catch (error) {
        toast.error(
          (error as AxiosError).message || "Đã xảy ra lỗi khi lấy sản phẩm"
        );
      }
    };
    getAllProducts();
  }, []);

  // Xử lý tìm kiếm sản phẩm theo tên
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  // Xử lý xóa sản phẩm
  const removeProduct = async (_id: string) => {
    if (window.confirm("Bạn muốn xóa sản phẩm này không?")) {
      try {
        await instance.delete(`/products/${_id}`);
        setProducts(products.filter((item) => item._id !== _id));
        setFilteredProducts(
          filteredProducts.filter((item) => item._id !== _id)
        );
        toast.success("Xóa thành công");
      } catch (error) {
        toast.error((error as AxiosError).message || "Đã xảy ra lỗi khi xóa");
      }
    }
  };

  return (
    <div className="p-6">
      {/* Tiêu đề */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
      </header>

      {/* Thanh tìm kiếm và nút thêm sản phẩm */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="p-2 bg-red-500 w-24 rounded-lg text-white font-medium hover:bg-red-600 transition">
            Search
          </button>
        </div>
        <Link to="/admin/products/add">
          <button className="p-2 bg-blue-500 w-28 rounded-lg text-white hover:bg-blue-600 transition">
            Add Product
          </button>
        </Link>
      </div>

      {/* Bảng danh sách sản phẩm */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 font-semibold text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-4 font-semibold text-gray-700">Image</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="py-3 px-4 font-semibold text-gray-700">
                Category
              </th>
              <th className="py-3 px-4 font-semibold text-gray-700">Brand</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4 w-24 h-24">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{item.price}$</td>
                  <td className="py-3 px-4">
                    {item.categoryId?.categoryName || "N/A"}
                  </td>
                  <td className="py-3 px-4">{item.brand || "N/A"}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <Link to={`/admin/products/update/${item._id}`}>
                      <button className="text-blue-500 text-2xl hover:text-blue-700 transition">
                        <AiFillEdit />
                      </button>
                    </Link>
                    <button
                      className="text-red-500 text-2xl hover:text-red-700 transition"
                      onClick={() => removeProduct(item._id)}
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
