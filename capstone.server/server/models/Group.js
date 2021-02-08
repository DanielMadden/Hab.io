import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Group = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: 'No description provided' },
    imageUrl: { type: String, default: 'https://wallpaperaccess.com/full/30100.jpg' },
    private: { type: Boolean, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Group.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Group
