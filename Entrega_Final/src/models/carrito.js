import { Schema, model } from "mongoose";
import { ProductSchema } from "./producto.js";
import { userSchema } from "./usuario.js"

const cartSchema = new Schema(
  {
    email: { type: String, require: true },
    products: { type: [ProductSchema], require: true },
    user: { type: userSchema, require: true },
    delivery_address: { type: String, require: true },
    total: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

export default Cart;



// import mongoose from 'mongoose';

// const carritoSchema = new mongoose.Schema({
//     productos: {
//        type: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'productos',
//         }],
//         default: []
//     }
// },{timestamps: true})

// export { carritoSchema };