const BlogPage = () => {
  return (
    <div className="container max-w-[1300px] mx-auto mt-[5%]">
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Post Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Featured Image */}
              <img
                src="https://happyphone.vn/wp-content/uploads/2024/09/Banner-Iphone-16.webp"
                alt="Blog featured image"
                className="w-full h-64 object-cover"
              />
              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Bí quyết chọn sản phẩm phù hợp với nhu cầu của bạn
                </h2>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>Đăng ngày 25/03/2025</span>
                  <span className="mx-2">•</span>
                  <span>Bởi Admin TH Shop</span>
                  <span className="mx-2">•</span>
                  <span>5 phút đọc</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 my-4">
                  "Chọn sản phẩm không chỉ dựa trên giá cả, mà còn dựa trên giá
                  trị mà nó mang lại cho bạn."
                </blockquote>
                <p className="text-gray-600 leading-relaxed">
                  Để biết thêm chi tiết, hãy liên hệ với chúng tôi qua email
                  hoặc hotline để được tư vấn miễn phí!
                </p>
              </div>
            </article>

            {/* Author Info */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6 flex items-center">
              <img
                src="https://happyphone.vn/wp-content/uploads/2024/09/Banner-Iphone-16.webp"
                alt="Author avatar"
                className="w-20 h-20 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Admin TH Shop
                </h3>
                <p className="text-gray-600 text-sm">
                  Chuyên gia về sản phẩm và xu hướng tiêu dùng tại TH Shop. Luôn
                  sẵn sàng chia sẻ kiến thức hữu ích cho bạn!
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar: Related Posts */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Bài Viết Liên Quan
              </h3>
              <div className="space-y-6">
                {/* Related Post 1 */}
                <div className="flex items-start">
                  <img
                    src="https://happyphone.vn/wp-content/uploads/2024/09/Banner-Iphone-16.webp"
                    alt="Related post"
                    className="w-20 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <a
                      href="#"
                      className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                    >
                      Cách bảo quản sản phẩm lâu dài
                    </a>
                    <p className="text-gray-500 text-sm mt-1">20/03/2025</p>
                  </div>
                </div>
                {/* Related Post 2 */}
                <div className="flex items-start">
                  <img
                    src="https://happyphone.vn/wp-content/uploads/2024/09/Banner-Iphone-16.webp"
                    alt="Related post"
                    className="w-20 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <a
                      href="#"
                      className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                    >
                      Top 5 sản phẩm bán chạy nhất 2025
                    </a>
                    <p className="text-gray-500 text-sm mt-1">15/03/2025</p>
                  </div>
                </div>
                {/* Related Post 3 */}
                <div className="flex items-start">
                  <img
                    src="https://happyphone.vn/wp-content/uploads/2024/09/Banner-Iphone-16.webp"
                    alt="Related post"
                    className="w-20 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <a
                      href="#"
                      className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                    >
                      Hướng dẫn mua sắm tiết kiệm
                    </a>
                    <p className="text-gray-500 text-sm mt-1">10/03/2025</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Call to Action */}
        <section className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bạn muốn đọc thêm?
          </h2>
          <p className="text-gray-600 mb-4">
            Đừng bỏ lỡ những bài viết mới nhất từ TH Shop!
          </p>
          <a
            href="#"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Xem tất cả bài viết
          </a>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
