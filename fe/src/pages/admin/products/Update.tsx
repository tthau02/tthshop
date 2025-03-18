import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../../config/axiosConfig";
import { ICategory } from "../../../interfaces/category";
import { ProductInput } from "../../../interfaces/products";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductInput>({ mode: "onChange" });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]); // Ảnh hiện tại từ backend
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu sản phẩm và danh mục khi component mount
  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        // Lấy dữ liệu sản phẩm
        const productRes = await instance.get(`/products/${id}`);
        const productData = productRes.data;
        reset(productData); // Điền dữ liệu vào form

        // Lấy danh sách ảnh hiện tại
        setExistingImages(productData.images || []);
        setPreviewImages(productData.images || []); // Hiển thị ảnh hiện tại trong preview

        // Lấy danh mục
        const categoryRes = await instance.get("/categores");
        setCategories(categoryRes.data);
      } catch (error) {
        toast.error((error as AxiosError).message || "Lỗi khi lấy dữ liệu");
      }
    };
    fetchProductAndCategories();
  }, [id, reset]);

  // Xử lý khi người dùng chọn ảnh mới
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages((prev) => [...prev, ...newImageUrls]); // Thêm ảnh mới vào preview
    }
  };

  // Xóa ảnh khỏi preview
  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Xử lý submit form
  const onSubmit = async (data: ProductInput) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      formData.append("brand", data.brand || "");
      formData.append("quantity", data.quantity?.toString() || "0");
      formData.append("categoryId", data.categoryId);
      formData.append("description", data.description || "");

      // Thêm ảnh hiện tại (nếu không bị xóa)
      const remainingExistingImages = existingImages.filter((img) =>
        previewImages.includes(img)
      );
      remainingExistingImages.forEach((img) =>
        formData.append("existingImages[]", img)
      );

      // Thêm ảnh mới từ input file
      const fileInput = document.querySelector(
        'input[name="images"]'
      ) as HTMLInputElement;
      if (fileInput?.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append("images", fileInput.files[i]);
        }
      }

      // Gửi request PUT
      await instance.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Cập nhật sản phẩm thành công");
      navigate("/admin/products");
    } catch (error) {
      toast.error((error as AxiosError).message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Product</h1>
      </header>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("name", {
                  required: "Không để trống tên sản phẩm",
                  minLength: { value: 3, message: "Cần tối thiểu 3 ký tự" },
                })}
              />
              {errors.name && (
                <span className="p-3 text-red-600">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </label>
              <input
                type="number"
                placeholder="Enter product price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("price", {
                  required: "Không để trống giá bán",
                  min: { value: 0, message: "Giá bán lớn hơn hoặc bằng 0" },
                  pattern: { value: /^\d+$/, message: "Sai định dạng số" },
                  setValueAs: (value) => Number(value),
                })}
              />
              {errors.price && (
                <span className="p-3 text-red-600">{errors.price.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                placeholder="Enter brand"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("brand")}
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("quantity", {
                  required: "Không để trống số lượng",
                  min: {
                    value: 0,
                    message: "Số lượng phải lớn hơn hoặc bằng 0",
                  },
                })}
              />
              {errors.quantity && (
                <span className="p-3 text-red-600">
                  {errors.quantity.message}
                </span>
              )}
            </div>
          </div>

          {/* Upload ảnh */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Product Images
            </h2>
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700"
              >
                Upload New Images (Multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("images")}
                onChange={handleImageChange}
              />
            </div>
            {previewImages.length > 0 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-26 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Danh mục và mô tả */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Category & Description
            </h2>
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="categoryId"
                {...register("categoryId", {
                  required: "Vui lòng chọn danh mục",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <span className="p-3 text-red-600">
                  {errors.categoryId.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                placeholder="Enter product description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={4}
                {...register("description")}
              />
            </div>
          </div>

          {/* Nút submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
