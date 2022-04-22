import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    title: { type: String },
    type: { type: String },
    image: { type: String },
    price: { type: Number },
})

export default mongoose.models.Item || mongoose.model('Item', itemSchema)