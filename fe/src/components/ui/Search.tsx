import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../config/axiosConfig";
import { Link } from "react-router-dom";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
}

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchSuggestions = async (searchQuery: string) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    try {
      const { data } = await instance.get(`/products/search?q=${searchQuery}`);
      setSuggestions(data.products || data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/products?q=${encodeURIComponent(query)}`); // Chuyển hướng với từ khóa
    }
  };

  // Xử lý nhấn Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query) {
      handleSearch();
    }
  };

  return (
    <div className="ml-10 flex items-center relative">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyPress={handleKeyPress} // Thêm sự kiện Enter
        className="p-2 text-[14px] rounded-l-lg w-[350px] bg-gray-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        onClick={handleSearch}
        className="p-2 rounded-r-lg text-white bg-red-500 text-[14px] hover:bg-red-600 transition-colors"
      >
        Search
      </button>

      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-10 left-0 w-[350px] bg-white shadow-lg rounded-lg z-10 max-h-64 overflow-y-auto">
          {suggestions.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="flex items-center p-2 hover:bg-gray-100 transition-colors"
              onClick={() => setQuery(product.name)}
            >
              <img
                src={product.thumbnail || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-10 h-10 object-cover rounded-md mr-2"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-xs text-gray-600">
                  {product.price.toLocaleString()}₫
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
