import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import instance from "../../../config/axiosConfig";
import { ICategory } from "../../../interfaces/category";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { AiOutlineClose, AiFillEdit } from "react-icons/ai";

const ListCategory = () => {
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<ICategory | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>();

  // Hàm lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      const res = await instance.get("/categores");
      setCategorys(res.data);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách danh mục");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const removeCate = async (_id: string) => {
    if (confirm("Bạn muốn xóa danh mục này không")) {
      try {
        await instance.delete(`/categores/${_id}`); // Đảm bảo endpoint đúng
        setCategorys(categorys.filter((item) => item._id !== _id));
        toast.success("Xóa thành công");
      } catch (error) {
        toast.error("Lỗi khi xóa danh mục");
      }
    }
  };

  const handleEditCategory = (category: ICategory) => {
    setEditCategory(category);
    setIsEditModalOpen(true);
  };

  const handleAddCategory = async (data: ICategory) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", data.categoryName);
      if (data.desc) formData.append("desc", data.desc);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);

      await instance.post(`/categores`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Thêm mới thành công");
      setIsModalOpen(false);
      reset();
      fetchCategories(); // Tải lại danh sách sau khi thêm
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };

  const handleUpdateCategory = async (data: ICategory) => {
    try {
      const formData = new FormData();
      formData.append("categoryName", data.categoryName);
      if (data.desc) formData.append("desc", data.desc);
      if (data.image && data.image[0]) formData.append("image", data.image[0]);

      await instance.put(`/categores/${editCategory?._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Cập nhật thành công");
      setIsEditModalOpen(false);
      reset();
      fetchCategories(); // Tải lại danh sách sau khi cập nhật
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category List</h1>
      </header>
      <div className="flex justify-between">
        <div>
          <input className="p-2 rounded-lg" type="text" placeholder="Search" />
          <button className="ml-3 p-2 bg-red-500 w-[80px] rounded-lg text-white hover:bg-red-400">
            Search
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-3 p-2 bg-blue-500 w-[80px] rounded-lg text-white hover:bg-blue-400"
        >
          Add
        </button>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.categoryName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="py-3 px-4">{item.categoryName}</td>
                <td className="py-3 px-4">{item.desc || "N/A"}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEditCategory(item)}
                    className="text-blue-500 text-2xl p-2"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    className="text-red-500 text-2xl ml-2"
                    onClick={() => removeCate(item._id)}
                  >
                    <AiOutlineClose />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-xl font-bold mb-4">Thêm danh mục mới</h2>
            <form onSubmit={handleSubmit(handleAddCategory)}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                placeholder="Category Name"
                {...register("categoryName", { required: "Không để trống" })}
              />
              {errors?.categoryName && (
                <span className="text-red-500">
                  {errors?.categoryName?.message}
                </span>
              )}
              <textarea
                className="w-full p-2 border rounded mb-3"
                placeholder="Description"
                {...register("desc")}
              />
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded mb-3"
                {...register("image")}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    reset(); // Reset form khi hủy
                  }}
                  className="mr-2 p-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa danh mục</h2>
            <form onSubmit={handleSubmit(handleUpdateCategory)}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-3"
                placeholder="Category Name"
                defaultValue={editCategory.categoryName}
                {...register("categoryName", { required: "Không để trống" })}
              />
              {errors?.categoryName && (
                <span className="text-red-500">
                  {errors?.categoryName?.message}
                </span>
              )}
              <textarea
                className="w-full p-2 border rounded mb-3"
                placeholder="Description"
                defaultValue={editCategory.desc}
                {...register("desc")}
              />
              <div className="mb-3">
                {editCategory.image && (
                  <img
                    src={editCategory.image}
                    alt={editCategory.categoryName}
                    className="w-24 h-24 object-cover rounded mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border rounded"
                  {...register("image")}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    reset(); // Reset form khi hủy
                  }}
                  className="mr-2 p-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ListCategory;
