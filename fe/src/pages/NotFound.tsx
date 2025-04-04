import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-indigo-600 animate-pulse">
            404
          </h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Trang Không Tìm Thấy
        </h2>
        <p className="text-gray-600 mb-6">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          Hãy kiểm tra lại URL hoặc quay về trang chủ!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Về Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
