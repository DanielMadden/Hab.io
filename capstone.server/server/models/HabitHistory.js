import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const HabitHistory = new Schema(
  {
    habitId: { type: ObjectId, ref: 'Habit', required: true },
    accountId: { type: String, ref: 'Account', required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

HabitHistory.virtual('account', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default HabitHistory
