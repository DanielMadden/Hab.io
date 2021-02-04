import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Follow = new Schema(
  {
    followerId: { type: String, ref: 'Account', required: true },
    followeeId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Follow.virtual('follower', {
  localField: 'followerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Follow.virtual('followee', {
  localField: 'followeeId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Follow
