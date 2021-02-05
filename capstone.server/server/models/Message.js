import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Message = new Schema(
  {
    groupId: { type: String, required: true },
    body: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    createdAt: { type: Date, expires: nextWeek(), default: Date.now }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

Message.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

function nextWeek(){
  var today = new Date()
  var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
  return nextWeek
}

export default Message
