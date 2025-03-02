import BannerSlider from "../components/BannerSlider "

const Home = () => {
  return (
  <>
    <BannerSlider />

    <div className="container max-w-[1300px] mx-auto m-5">
      <h3 className="mb-3 uppercase font-bold text-[16px] text-red-600">Danh Mục Nổi Bật</h3>
      <div className="flex items-center justify-between">
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
          <img className="w-full h-48 object-cover " src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Product Name</h2>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
          <img className="w-full h-48 object-cover " src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Product Name</h2>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
          <img className="w-full h-48 object-cover " src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Product Name</h2>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
          <img className="w-full h-48 object-cover " src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Product Name</h2>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
          <img className="w-full h-48 object-cover " src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Product Name</h2>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
          <img className="w-full h-48 object-cover " src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Product Name</h2>
          </div>
        </div>
      </div>
      <div className="h-[400px] flex items-center justify-center gap-7">
        <div className="relative w-[660px] h-[350px]">
          <img className="w-full h-full object-cover rounded-lg" src="https://www.apple.com/v/iphone-16/c/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png?202411071254"/>
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-2xl font-bold mb-2">iPhone 16</h2>
            <p className="mb-4 text-sm">Trải nghiệm công nghệ vượt trội với iPhone 16 mới nhất.</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              Mua ngay
            </button>
          </div>
        </div>
        <div className="relative w-[660px] h-[350px]">
          <img className="w-full h-full object-cover rounded-lg" src="https://www.apple.com/v/iphone-16/c/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png?202411071254" />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-2xl font-bold mb-2">iPhone 16</h2>
            <p className="mb-4 text-sm">Trải nghiệm công nghệ vượt trội với iPhone 16 mới nhất.</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
  
      <h3 className="mb-3 uppercase font-bold text-[16px] text-red-600">sản phẩm mới nhất</h3>
      <div className="flex items-center justify-between">
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
          <img className="w-full h-48 object-cover" src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 ">Product Name</h2>
            <p className="mt-2 text-gray-600 text-sm">
              This is a brief description of the product.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-red-500">$99.99</span>
              <button className="px-3 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded hover:bg-red-400">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
          <img className="w-full h-48 object-cover" src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Product Name</h2>
            <p className="mt-2 text-gray-600 text-sm">
              This is a brief description of the product.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-red-500">$99.99</span>
              <button className="px-3 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded hover:bg-red-400">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
          <img className="w-full h-48 object-cover" src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Product Name</h2>
            <p className="mt-2 text-gray-600 text-sm">
              This is a brief description of the product.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-red-500">$99.99</span>
              <button className="px-3 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded hover:bg-red-400">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
          <img className="w-full h-48 object-cover" src="https://via.placeholder.com/300" alt="Product Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Product Name</h2>
            <p className="mt-2 text-gray-600 text-sm">
              This is a brief description of the product.
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-red-500">$99.99</span>
              <button className="px-3 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded hover:bg-red-400">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
  )
}

export default Home