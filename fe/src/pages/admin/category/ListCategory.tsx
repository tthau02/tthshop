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
    formState: { errors },
  } = useForm<ICategory>();

  useEffect(() => {
    const getAllCategorys = async () => {
      const res = await instance.get("/categores");
      setCategorys(res.data);
    };
    getAllCategorys();
  }, []);

  const removeCate = async (_id: number) => {
    if (confirm("Bạn muốn xóa danh mục này không")) {
      await instance.delete(`/categores/${_id}`);
      setCategorys(categorys.filter((item) => item._id !== _id));
      toast.success("Xóa thành công");
    }
  };

  const handleAddCategory = async (data: ICategory) => {
    try {
      await instance.post(`/categores`, data);
      toast.success("Thêm mới thành công");
      setIsModalOpen(false);
    } catch (error) {
      toast.error((error as AxiosError).message);
    }
  };

  const handleEditCategory = (category: ICategory) => {
    setEditCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (data: ICategory) => {
    try {
      await instance.put(`/categores/${editCategory?._id}`, data);
      toast.success("Cập nhật thành công");
      setIsEditModalOpen(false);
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
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categorys.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{item.categoryName}</td>
                <td className="py-3 px-4">{item.desc}</td>
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-350">
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
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 p-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button className="p-2 bg-blue-500 text-white rounded">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-350">
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
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="mr-2 p-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button className="p-2 bg-blue-500 text-white rounded">
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
