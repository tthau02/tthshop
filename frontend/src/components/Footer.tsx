
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Cột 1: Logo và mô tả */}
          <div className="space-y-4">
            <h3 className="text-2xl text-white tracking-wide">
              <span className="text-red-500">TH</span>Shop
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Nơi lý tưởng mua sắm các sản phẩm đồ công nghệ với giá cả phải chăng.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-red-500 pb-1 inline-block">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-red-500 pb-1 inline-block">
              Hỗ trợ
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors duration-200">
                  Bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 border-b border-red-500 pb-1 inline-block">
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-medium text-gray-200">Email:</span>{' '}
                <a href="mailto:support@thshop.com" className="hover:text-red-400 transition-colors duration-200">
                  support@thshop.com
                </a>
              </li>
              <li>
                <span className="font-medium text-gray-200">Hotline:</span>{' '}
                <a href="tel:+84123456789" className="hover:text-red-400 transition-colors duration-200">
                  +84 123 456 789
                </a>
              </li>
              <li className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-xl"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-xl"
                  aria-label="TikTok"
                >
                  <i className="fab fa-tiktok" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-xl"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} THShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;