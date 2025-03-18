import { Link } from "react-router-dom";
import IProduct from "../interfaces/products";
import AddToCart from "./common/AddTocart";

const ProductsItem = (props: IProduct) => {
  return (
    <div className="border rounded-lg p-3 hover:shadow-lg transition">
      <Link to={`/products/${props._id}`}>
        <img
          className="w-full h-44 object-cover rounded-md mb-3"
          src={props.thumbnail}
          alt={props.name}
        />
      </Link>
      <div className="p-2">
        <Link to={`/products/${props._id}`}>
          <h2 className="font-semibold text-gray-800 ">{props.name}</h2>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <span className="text-base font-bold text-red-500">
            {props.price.toLocaleString()}₫
          </span>
          <AddToCart productId={props._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;
