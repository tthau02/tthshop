import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 3,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      minLength: 6,
      required: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    roles: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
