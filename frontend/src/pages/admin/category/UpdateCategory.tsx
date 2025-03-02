
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../../../config/axiosConfig'
import { ICategory } from '../../../interfaces/category'
import { useEffect } from 'react'

const UpdateCategory = () => {
    const navigate = useNavigate();
    const {_id} = useParams();
    const {register, handleSubmit, reset, formState:{errors}} = useForm<ICategory>()
    useEffect(() => {
        const getCategory = async () => {
          const res = await instance.get(`/categores/${_id}`);
         reset(res.data);
        }
        getCategory();
    }, [_id, reset])
    const onSubmit = async (data: ICategory) => {
      try {
  
          await instance.put(`/categores/${_id}`,data);
          toast.success("Thêm thành công");
          navigate("/admin/categores");
      } catch (error) {
          toast.error((error as AxiosError).message);
      }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Category</h1>
      </header>
      <div className="bg-white shadow-lg rounded-lg p-6 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register('categoryName',{
                required: "Không để trống tên sản phẩm",
                minLength: {
                  value: 3,
                  message: "Cần tối thiểu 3 ký tự"
                }
              })}
            />
            {errors?.categoryName && <span className='p-3 text-red-600'>{errors?.categoryName?.message}</span>}
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
              {...register('desc')}
            >    
            </textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateCategory