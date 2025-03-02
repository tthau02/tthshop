import { useEffect, useState } from "react"
import IProduct from "../interfaces/products"
import { useParams } from "react-router-dom";
import instance from "../config/axiosConfig";

const ProductDetail = () => {
  
    const [ product, setProduct ] = useState<IProduct[]>([]);
    const { id } = useParams();
    useEffect(() => {
        const getProduct = async () => {
           try {
            const {data} = await instance(`/products/${id}`)
            setProduct(data);
           } catch (error) {
            console.log(error);
           }
        }
        getProduct();
    }, [id])
  return (
    <section className="max-w-[1250px] mx-auto m-5 mt-[6%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phần hình ảnh sản phẩm */}
            <div>
            <img src={product.thumbnail} alt="Tên Sản Phẩm" className="w-[400px] h-auto rounded-lg shadow-md" />
            </div>
            {/* Phần thông tin chi tiết sản phẩm */}
            <section className="flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-xl text-red-500 mt-2">Giá: {product.price}₫</p>
                    <p className="mt-4 text-gray-600">
                        {product.description}
                    </p>
                    {/* Thông tin thương hiệu */}
                    <p className="mt-4 text-gray-600">
                    <span className="font-semibold">Thương hiệu:</span> {product.brand}
                    </p>
                    {/* Đánh giá sao */}
                    <div className="flex items-center mt-4">
                    <div className="flex text-yellow-400">
                        {/* Sử dụng biểu tượng sao, ví dụ với Heroicons */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.911c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.911a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.911c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.911a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.911c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.911a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.911c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.175 0l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.911a1 1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                    </div>
                    <p className="ml-2 text-gray-600">({product.rating} đánh giá)</p>
                    </div>
                </div>
                {/* Nút hành động */}
                <div className="mt-6 flex space-x-4">
                    <button className="flex-1 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600">
                    Thêm vào giỏ hàng
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-800">
                    Mua ngay
                    </button>
                </div>
            </section>
        </div>

    <section className="mt-4">
        {/* Tiêu đề phần bình luận */}
        <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
        {/* Form thêm bình luận mới */}
        <form className="mb-6">
            <div className="mb-4">
            <label htmlFor="comment" className="sr-only">Bình luận</label>
            <textarea id="comment" rows={4} className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline" placeholder="Viết bình luận..." defaultValue={""} />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline">Đăng</button>
        </form>
    </section>

        {/* Danh sách bình luận */}
        <section className="space-y-4">
        {/* Bình luận 1 */}
        <div className="flex">
            <div className="flex-shrink-0 mr-3">
            <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/40" alt="Avatar người dùng" />
            </div>
            <div>
            <div className="text-sm font-semibold text-gray-900">Nguyễn Văn A</div>
            <div className="text-sm text-gray-600">2 giờ trước</div>
            <p className="mt-1 text-gray-700">Sản phẩm rất tốt, tôi rất hài lòng!</p>
            <div className="mt-2 flex space-x-4">
                <button className="text-sm text-blue-500 hover:underline">Thích</button>
                <button className="text-sm text-blue-500 hover:underline">Trả lời</button>
            </div>
            </div>
        </div>
        {/* Bình luận 2 */}
        <div className="flex">
            <div className="flex-shrink-0 mr-3">
            <img className="w-10 h-10 rounded-full" src="https://via.placeholder.com/40" alt="Avatar người dùng" />
            </div>
            <div>
            <div className="text-sm font-semibold text-gray-900">Trần Thị B</div>
            <div className="text-sm text-gray-600">1 ngày trước</div>
            <p className="mt-1 text-gray-700">Giao hàng nhanh chóng, chất lượng sản phẩm tuyệt vời.</p>
            <div className="mt-2 flex space-x-4">
                <button className="text-sm text-blue-500 hover:underline">Thích</button>
                <button className="text-sm text-blue-500 hover:underline">Trả lời</button>
            </div>
            </div>
        </div>
        </section>

    </section>
  )
}

export default ProductDetail