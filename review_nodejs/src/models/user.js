import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minLength: 3
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number
        },
        password: {
            type: String,
            minLength: 6,
            required: true
        }, 
        roles: {
            type: String,
            emun: ["user", "admin"],
            default: "user",
        }
    }, {
        timeseries: true,
        versionKey: false
    }
)

export default mongoose.model("User", userSchema);