import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        remark: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    table: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    isServed: {
      type: Boolean,
      required: true,
      default: false,
    },
    servedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
