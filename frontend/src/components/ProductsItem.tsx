import { Link } from "react-router-dom"
import IProduct from "../interfaces/products"


const ProductsItem = (props: IProduct) => {

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105">
        <Link to={`/products/${props._id}`}>
            <img className="object-cover" src={props.thumbnail} alt="Product Image" />
        </Link>
        <div className="p-4">
            <Link to={`/products/${props._id}`}>
                <h2 className="text-xl font-semibold text-gray-800 ">{props.title}</h2>
            </Link>
            <p className="mt-2 text-gray-600">
                Đánh giá: {props.rating}
            </p>
            <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-red-500">{props.price}$</span>
            <button className="px-3 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded hover:bg-red-400">
                Add to Cart
            </button>
            </div>
        </div>
    </div>

  )
}

export default ProductsItem