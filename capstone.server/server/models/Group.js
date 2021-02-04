import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Group = new Schema({
  image: { type: String, required: true },
  private: { type: Boolean, required: true, default: false },
  creatorId: { type: String, required: true },
  members: [{ type: String }]
}, { timestamps: true })

Group.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: 'id',
  justOne: true
})

export default Group