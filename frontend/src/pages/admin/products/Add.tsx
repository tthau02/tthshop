import {ProductInput} from '../../../interfaces/products'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import instance from '../../../config/axiosConfig'

const Add = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm<ProductInput>()
    const onSubmit = async (data: ProductInput) => {
      try {
  
          await instance.post(`/products`,data);
          toast.success("Thêm thành công");
          navigate("/admin/products");
      } catch (error) {
          toast.error((error as AxiosError).message);
      }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
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
                },
                setValueAs: (value) => Number(value)
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
      </div>

        <div className="mb-6">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register('category')}
            >
                <option selected>Chọn danh mục</option>
                <option value={'laptops'}>laptops</option>
                <option value={'smartphones'}>smartphones</option>
                <option value={'skincare'}>skincare</option>
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

export default Add