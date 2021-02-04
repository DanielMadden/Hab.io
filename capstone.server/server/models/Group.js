import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Group = new Schema(
  {
    imageUrl: { type: String, default: 'https://www.linkedin.com/in/ethan-vachon-2574231ab/' },
    private: { type: Boolean, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    name: { type: String, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Group.virtual('user', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Group
