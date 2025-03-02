import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import instance from '../../../config/axiosConfig'
import { ICategory } from '../../../interfaces/category'

const ListCategory = () => {
  const [categorys, setCategorys] = useState<ICategory[]>([])

  useEffect(() => {
      const getAllCategorys = async () => {
        const res = await instance.get(`/categores`);
        setCategorys(res.data)
      }
      getAllCategorys();
  }, [])

  const removeCate = async (_id: number) => {
    if(confirm("Bạn muốn xóa sản phẩm này không")){
      await instance.delete(`categores/${_id}`);
      setCategorys(categorys.filter((item) => item._id !== _id));
      toast.success("Xóa thành công")
    }
  }
  return (
    <>
    <header className="mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Category List</h1>
    </header>
    <div className='flex justify-between'>
        <div>
            <input className='p-2 rounded-lg' type="text" placeholder='Search'/>
            <button className='ml-3 p-2 bg-red-500 w-[80px] rounded-lg text-white hover:bg-red-400'>Search</button>
        </div>
        <Link to="/admin/categores/add"><button className='ml-3 p-2 bg-blue-500 w-[80px] rounded-lg text-white hover:bg-blue-400'>Add</button></Link>
    </div>
         {/* <!-- Table --> */}
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
            <tr className="border-t">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{item.categoryName}</td>
              <td className="py-3 px-4">{item.desc}</td>
              <td className="py-3 px-4">
              <Link to={`/admin/categores/update/${item._id}`}><button className="text-blue-500 p-2">Edit</button></Link>
              <button className="text-red-500 ml-2" onClick={() => removeCate(item._id)}>Delete</button>
              </td>
          </tr>
            ))}
       
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListCategory