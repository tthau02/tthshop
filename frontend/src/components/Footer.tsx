import React from 'react'

const Footer = () => {
  return (
        <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Cột 1: Logo và mô tả */}
            <div>
                <h3 className="text-white text-lg font-bold">Shop Ký Gửi</h3>
                <p className="mt-2 text-sm">
                Địa điểm lý tưởng để bạn ký gửi và tìm mua các sản phẩm thời trang chất lượng với giá cả hợp lý.
                </p>
            </div>
            {/* Cột 2: Liên kết nhanh */}
            <div>
                <h4 className="text-white font-semibold mb-3">Liên kết nhanh</h4>
                <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Trang chủ</a></li>
                <li><a href="#" className="hover:text-white">Sản phẩm</a></li>
                <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                </ul>
            </div>
            {/* Cột 3: Hỗ trợ */}
            <div>
                <h4 className="text-white font-semibold mb-3">Hỗ trợ</h4>
                <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="hover:text-white">Chính sách bảo hành</a></li>
                <li><a href="#" className="hover:text-white">Điều khoản dịch vụ</a></li>
                <li><a href="#" className="hover:text-white">Bảo mật</a></li>
                </ul>
            </div>
            {/* Cột 4: Liên hệ */}
            <div>
                <h4 className="text-white font-semibold mb-3">Liên hệ</h4>
                <ul className="space-y-2 text-sm">
                <li><span className="font-medium">Email:</span> support@shopkygui.com</li>
                <li><span className="font-medium">Hotline:</span> +84 123 456 789</li>
                <li className="flex space-x-4 mt-2">
                    <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook" /></a>
                    <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-tiktok" /></a>
                    <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram" /></a>
                </li>
                </ul>
            </div>
            </div>
            {/* Dòng bản quyền */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
            <p>© 2025 Shop Ký Gửi. All rights reserved.</p>
            </div>
        </div>
        </footer>
  )
}

export default Footer