import { dbContext } from '../db/DbContext'

class HabitHistoryService {
  async getToday(habitId) {
    const today = new Date()
    const search = {
      habitId: habitId,
      month: today.getMonth(),
      day: today.getDate()
    }
    return await dbContext.HabitHistory.find(search).populate('account')
  }

  async create(data) {
    const today = new Date()
    data.month = today.getMonth()
    data.day = today.getDate()
    const existing = await dbContext.HabitHistory.findOne(data)
    if (existing == null) {
      const newHabitHistory = await dbContext.HabitHistory.create(data)
      return newHabitHistory
    } else return 'Already completed today'
  }
}

export const habitHistoryService = new HabitHistoryService()
