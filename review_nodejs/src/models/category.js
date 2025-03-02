import mongoose from "mongoose";

const categotySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true
        }, 
        desc: {
            type: String,
        }
    }, 
    {
        timeseries: true,
        versionKey: false
    }
)

export default mongoose.model("Category", categotySchema);