import { dbContext } from '../db/DbContext'

class HabitHistoryService {
  // async getToday(habitId) {
  //   await dbContext.HabitHistory.find
  // }

  async create(data) {
    const today = new Date()
    data.month = today.getMonth()
    data.day = today.getDate()
    console.log(data)
    const existing = await dbContext.HabitHistory.findOne(data)
    console.log(existing)
    if (existing == null) {
      console.log('none existing, making a new one!')
      const newHabitHistory = await dbContext.HabitHistory.create(data)
      console.log(newHabitHistory)
      return newHabitHistory
    } else return 'Already completed today'
  }
}

export const habitHistoryService = new HabitHistoryService()
