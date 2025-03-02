import {ProductInput} from '../../../interfaces/products'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import instance from '../../../config/axiosConfig'
import { ICategory } from '../../../interfaces/category'

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {register, handleSubmit, formState:{errors}, reset} = useForm<ProductInput>()
    const [categories, setCategories] = useState<ICategory[]>([])
    useEffect(() => {
        const getById = async () => {
          const res = await instance.get(`/products/${id}`);
          reset(res.data)
        }
        getById();
    }, [id, reset])
    const onSubmit = async (data: ProductInput) => {
      try {
          // Loại bỏ các trường không hợp lệ trước khi gửi
          const { _id, createdAt, updatedAt, ...validData } = data;
  
          await instance.put(`/products/${id}`, validData);
          toast.success("Cập nhật thành công");
          navigate("/admin/products");
      } catch (error) {
          toast.error((error as AxiosError).message);
      }
  };
  
      useEffect(() => {
        const fechCategory = async () => {
          const {data} = await instance.get(`/categores`);
          setCategories(data);
        }
        fechCategory()
      }, [])
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Product</h1>
      </header>
      <div className="bg-white shadow-lg rounded-lg p-6 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register('name',{
                required: "Không để trống tên sản phẩm",
                minLength: {
                  value: 3,
                  message: "Cần tối thiểu 3 ký tự"
                }
              })}
            />
            {errors?.name && <span className='p-3 text-red-600'>{errors?.name?.message}</span>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($)
            </label>
            <input
              type="number"
              placeholder="Enter product price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register('price',{
                required: "Không để trống giá bán",
                min: {
                  value: 0,
                  message: "Giá bán lớn hơn hoặc bằng 0"
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Sai định dạng number"
                }
              })}
            />
           {errors?.price && <span className='p-3 text-red-600'>{errors?.price?.message}</span>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Image
            </label>
            <input
              type="text"
              placeholder="Enter product image"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('thumbnail')}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              placeholder="Enter brand"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('brand')}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product inStock
            </label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  className="mr-2"
                />
                Còn hàng
              </label>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                />
                Hết hàng
              </label>
            </div>
          </div>
        <div className="mb-6">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
            <select
                id="category"
                {...register("categoryId", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option value="">Chọn danh mục</option>
                {categories.map((cate) => (
                    <option key={cate._id} value={cate._id}>
                        {cate.categoryName}
                    </option>
                ))}
            </select>
        </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register('description')}
            >    
            </textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Update