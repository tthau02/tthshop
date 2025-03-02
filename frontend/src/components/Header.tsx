import { Link, NavLink } from "react-router-dom"


const Header = () => {
  return (
    <>
      <div className='p-3 bg-black fixed top-0 left-0 w-full z-50'>
        <div className='container max-w-[1300px] mx-auto flex justify-between items-center'>
            <Link to='/' className='flex items-center'>
                <h1 className='text-[30px] uppercase font-bold text-red-600'>TH</h1>
                <span className='text-[30px] font-bold text-orange-400'>Shop</span>
            </Link>
            <nav className='flex items-center justify-center space-x-4'>
                <NavLink to="/" className='text-white hover:text-red-300'>Trang Chủ</NavLink>
                <NavLink to="/products" className='text-white hover:text-red-300'>Sản Phẩm</NavLink>
                <NavLink to="/sale" className='text-white hover:text-red-300'>Khuyến Mãi</NavLink>
                <NavLink to="/contact" className='text-white hover:text-red-300'>Liên Hệ</NavLink>
            </nav>
            <div className='flex justify-center items-center'>
                <input type="text" placeholder='Search' className='p-2 text-[14px] rounded-s-lg'/>
                <button className='p-2 me-6 rounded-e-lg text-white bg-red-500 text-[14px] hover:bg-red-300'>Search</button>
                <div className='flex bg-red-600 rounded-lg'>
                    <Link to="/register"><button className='text-white p-2 hover:bg-red-400 rounded-s-lg'>Đăng Nhập</button></Link>
                    <Link to="/login"><button className='text-white p-2 hover:bg-red-400 rounded-e-lg'>Đăng Ký</button></Link>
                </div>
            </div>
        </div>
    </div>
  </>
  )
}

export default Header