import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Badge = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true }
  }
)

export default Badge
