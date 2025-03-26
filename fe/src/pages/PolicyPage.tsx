const PolicyPage = () => {
  return (
    <div className="container max-w-[1300px] mx-auto mt-[5%]">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Privacy Policy */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Chính Sách Bảo Mật
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chúng tôi tại TH Shop cam kết bảo vệ thông tin cá nhân của bạn.
              Mọi dữ liệu bạn cung cấp (tên, địa chỉ, email, số điện thoại) chỉ
              được sử dụng để xử lý đơn hàng và cải thiện trải nghiệm mua sắm.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Không chia sẻ thông tin cá nhân với bên thứ ba không liên quan.
              </li>
              <li>
                Sử dụng công nghệ mã hóa SSL để bảo vệ dữ liệu thanh toán.
              </li>
              <li>
                Cho phép khách hàng yêu cầu xóa thông tin cá nhân bất kỳ lúc
                nào.
              </li>
            </ul>
          </section>

          {/* Return Policy */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Chính Sách Đổi Trả
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chúng tôi mong muốn bạn hài lòng với sản phẩm của mình. Nếu có vấn
              đề, bạn có thể đổi trả trong các trường hợp sau:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Điều kiện đổi trả:
                </h3>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Sản phẩm còn nguyên tem mác, chưa qua sử dụng.</li>
                  <li>Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.</li>
                  <li>Có hóa đơn hoặc email xác nhận đơn hàng.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Quy trình:
                </h3>
                <ol className="list-decimal pl-6 text-gray-600">
                  <li>
                    Liên hệ qua email: support@thshop.com hoặc hotline:
                    0123-456-789.
                  </li>
                  <li>Gửi sản phẩm về địa chỉ kho của chúng tôi.</li>
                  <li>
                    Nhận hoàn tiền hoặc sản phẩm thay thế trong 3-5 ngày làm
                    việc.
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Shipping Policy */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Chính Sách Vận Chuyển
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              TH Shop hợp tác với các đơn vị vận chuyển uy tín để đảm bảo sản
              phẩm đến tay bạn nhanh chóng và an toàn.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">
                  Thời gian giao hàng:
                </h3>
                <ul className="list-disc pl-6 text-gray-600">
                  <li>Nội thành: 1-2 ngày làm việc.</li>
                  <li>Ngoại thành & tỉnh: 3-5 ngày làm việc.</li>
                  <li>Miễn phí vận chuyển cho đơn hàng từ 500.000 VNĐ.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Chi phí:</h3>
                <p className="text-gray-600">
                  Phí vận chuyển tiêu chuẩn: 30.000 VNĐ/đơn hàng.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bạn có thắc mắc về chính sách của chúng tôi?
            </h2>
            <p className="text-gray-600 mb-4">
              Liên hệ ngay với đội ngũ hỗ trợ của TH Shop để được giải đáp.
            </p>
            <a
              href="mailto:support@thshop.com"
              className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Gửi Email cho chúng tôi
            </a>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PolicyPage;
