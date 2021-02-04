import mongoose from 'mongoose'
const Schema = mongoose.Schema

const FollowRelationship = new Schema(
  {
    followerId: { type: String, ref: 'Account', required: true },
    followeeId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

FollowRelationship.virtual('follower', {
  localField: 'followerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

FollowRelationship.virtual('followee', {
  localField: 'followeeId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default FollowRelationship
