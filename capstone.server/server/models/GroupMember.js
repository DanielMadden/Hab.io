import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const GroupMember = new Schema(
  {
    groupId: { type: ObjectId, ref: 'Group', required: true },
    memberId: { type: String, ref: 'Account', required: true },
    status: { type:String, required: true}
  }, { timestamps: true, toJSON: { virtuals: true } }
)

GroupMember.virtual('member', {
  localField: 'memberId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default GroupMember
