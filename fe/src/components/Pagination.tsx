import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const maxPagesToShow = 5; // Số trang tối đa hiển thị
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage - halfPagesToShow);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Điều chỉnh startPage nếu endPage gần cuối
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="flex justify-center mt-10 mb-10">
      <nav className="flex items-center space-x-2">
        <button
          className={`px-4 py-2 text-gray-700 bg-slate-200 border border-gray-300 rounded-l ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <AiFillCaretLeft />
        </button>

        {startPage > 1 && (
          <>
            <button
              className="px-3 py-1 border bg-white text-gray-700 hover:bg-gray-200"
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="px-3 py-1">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 border ${
              currentPage === page
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-3 py-1">...</span>}
            <button
              className="px-3 py-1 border bg-white text-gray-700 hover:bg-gray-200"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`px-4 py-2 text-gray-700 bg-slate-200 border border-gray-300 rounded-r ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <AiFillCaretRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
