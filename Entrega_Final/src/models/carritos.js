import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
    productos: {
       type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos',
        }],
        default: []
    }
},{timestamps: true})

export { carritoSchema };