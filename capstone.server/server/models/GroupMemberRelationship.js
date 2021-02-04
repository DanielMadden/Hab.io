import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const GroupMemberRelationship = new Schema(
  {
    groupId: { type: ObjectId, ref: 'Group', required: true },
    memberId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

GroupMemberRelationship.virtual('member', {
  localField: 'memberId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default GroupMemberRelationship
