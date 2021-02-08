import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Habits = new Schema(
  {
    name: { type: String, required: true },
    groupId: { type: ObjectId, required: true, ref: 'Group' },
    days: { type: [String], enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    frequency: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    completed: { type: [String] },
    desription: { type: String, default: 'No description provided' }
  }, { timestamps: true, toJSON: { virtuals: true } }
)

export default Habits
