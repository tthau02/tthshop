import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);
