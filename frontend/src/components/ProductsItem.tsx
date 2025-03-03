import { Link } from "react-router-dom"
import IProduct from "../interfaces/products"


const ProductsItem = (props: IProduct) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
        <Link to={`/products/${props._id}`}>
            <img className="w-full h-48 object-cover" src={props.thumbnail} alt={props.name} />
        </Link>
        <div className="p-4">
            <Link to={`/products/${props._id}`}>
                <h2 className="text-base font-semibold text-gray-800 ">{props.name}</h2>
            </Link>
            <p className="mt-2 text-gray-600">
                Đánh giá: {props.rating}
            </p>
            <div className="flex items-center justify-between mt-4">
            <span className="text-base font-bold text-red-500">{props.price}$</span>
            <button className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-400">
                Add to Cart
            </button>
            </div>
        </div>
    </div>

  )
}

export default ProductsItem