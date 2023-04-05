import { Schema, model } from "mongoose"; 

const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    // category: { type: String, ref: "Category", require: true },
    thumbnail: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    code: {type: String, require: true},
    // in_cart: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);

export { ProductSchema, Product };



// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//     code: { type: String, required: true},
//     title: { type: String, required: true},
//     description: { type: String, required: true},
//     thumbnail: { type: String, required: true},
//     price: { type: Number, required: true},
//     stock: { type: Number, required: true}
// },{ timestamps: true })

// export default productSchema
