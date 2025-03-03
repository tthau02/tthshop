import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IProduct from '../../../interfaces/products'
import toast from 'react-hot-toast'
import instance from '../../../config/axiosConfig'
import { AxiosError } from 'axios'

const List = () => {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
      const getAllProducts = async () => {
        try {
          const res = await instance.get(`/products?_page=1&_limit=10`);
          setProducts(res.data.docs)
        } catch (error) {
          console.log(error)
          toast.error((error as AxiosError).message);
        }
      }
      getAllProducts();
  }, [])

  const removeProduct = async (_id: string) => {
    if(confirm("Bạn muốn xóa sản phẩm này không")){
      await instance.delete(`products/${_id}`);
      setProducts(products.filter((item) => item._id !== _id));
      toast.success("Xóa thành công")
    }
  }
  return (
    <>
    <header className="mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
    </header>
    <div className='flex justify-between'>
        <div>
            <input className='p-2 rounded-lg' type="text" placeholder='Search'/>
            <button className='ml-3 p-2 bg-red-500 w-[80px] rounded-lg text-white hover:bg-red-400'>Search</button>
        </div>
        <Link to="/admin/products/add"><button className='ml-3 p-2 bg-blue-500 w-[80px] rounded-lg text-white hover:bg-blue-400'>Add</button></Link>
    </div>
         {/* <!-- Table --> */}
      <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3">Category</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            
            {products.map((item, index) => (
            <tr className="border-t">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4 w-[150px] h-[150px]">
                  <img src={item.thumbnail} alt={item.title} />
              </td>
              <td className="py-3 px-4">{item.price}$</td>
              <td className="py-3">{item.categoryId?.categoryName}</td>
              <td className="py-3 px-4">
              {/* <span className='text-white p-2 text-[14px] bg-red-500 rounded-lg'>Còn Hàng </span>  */}
              {item.brand}
              </td>
              <td className="py-3 px-4">
              <Link to={`/admin/products/update/${item._id}`}><button className="text-blue-500 p-2">Edit</button></Link>
              <button className="text-red-500 ml-2" onClick={() => removeProduct(item._id)}>Delete</button>
              </td>
          </tr>
            ))}
       
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List