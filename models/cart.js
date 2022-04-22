import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    title: { type: String },
    image: { type: String },
    quantity: { type: Number },
    price: { type: Number },
})

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)