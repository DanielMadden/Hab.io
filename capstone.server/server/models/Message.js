import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Message = new Schema(
  {
    groupId: { type: String, required: true },
    body: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Message.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Message
