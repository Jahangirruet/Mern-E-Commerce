import mongoose from "mongoose";

const DataSchema = new mongoose.Schema(
    {
        color:{ type: String, required: true },
        qty:{ type: String, required: true },
        size:{ type: String, required: true },
        userID: {type: mongoose.Schema.Types.ObjectId, required: true},
        productID: { type: mongoose.Schema.Types.ObjectId, required: true },   
    },
    { timestamps: true, versionKey: false }
);

const CartModel = mongoose.model("carts", DataSchema);

export default CartModel;