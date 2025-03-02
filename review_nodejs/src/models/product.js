import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            min: 3,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);