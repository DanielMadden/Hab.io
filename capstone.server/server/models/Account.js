import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Account = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String },
    picture: { type: String },
    backgroundImage: { type: String },
    badges: [{
      name: String,
      imageUrl: String,
      description: String
    }],
    will: { type: Number, default: 0 }
    // NOTE If you wish to add additional public properties for Accounts do so here
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)

export default Account
