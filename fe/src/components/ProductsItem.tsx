import { Link } from "react-router-dom";
import IProduct from "../interfaces/products";
import AddToCart from "./common/AddTocart";

const ProductsItem = (props: IProduct) => {
  return (
    <div className="shadow-md rounded-tl-lg rounded-tr-lg p-3 hover:border-red-600 transition-all duration-300 relative group border border-transparent">
      <Link to={`/products/${props._id}`}>
        <img
          className="w-full h-44 object-cover rounded-md mb-3"
          src={props.thumbnail}
          alt={props.name}
        />
      </Link>
      <div className="p-2">
        <Link to={`/products/${props._id}`}>
          <h2 className="font-semibold text-gray-800">{props.name}</h2>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <span className="text-base font-bold text-red-500">
            {props.price.toLocaleString()}₫
          </span>
          <span className="text-[14px] text-red-500">
            Còn hàng: {props.quantity}
          </span>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-[-2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
        <AddToCart productId={props._id} />
      </div>
    </div>
  );
};

export default ProductsItem;
