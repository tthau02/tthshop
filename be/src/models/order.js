import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "vnpay", "wallet"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    cancelledBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // Nếu null, nghĩa là đơn chưa bị hủy
    },
    cancelledAt: {
      type: Date,
      default: null, // Thời gian hủy đơn
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("Order", orderSchema);
