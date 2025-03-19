const Comment = () => {
  return (
    <section className="mt-10 bg-white rounded-md p-5">
      <h2 className="text-xl font-bold mb-6">Bình luận</h2>
      <form className="bg-gray-100 p-6 rounded-lg">
        <textarea
          rows={4}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Viết bình luận..."
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Đăng
        </button>
      </form>

      {/* Danh sách bình luận */}
      <div className="mt-6 space-y-4">
        <div className="flex gap-4 items-start bg-white p-4 rounded-lg shadow">
          <img
            className="w-12 h-12 rounded-full"
            src="https://via.placeholder.com/40"
            alt="User Avatar"
          />
          <div>
            <p className="font-semibold">Nguyễn Văn A</p>
            <p className="text-gray-500 text-sm">2 giờ trước</p>
            <p className="mt-2 text-gray-700">
              Sản phẩm rất tốt, tôi rất hài lòng!
            </p>
            <div className="mt-2 flex space-x-4 text-blue-500">
              <button className="hover:underline">Thích</button>
              <button className="hover:underline">Trả lời</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
