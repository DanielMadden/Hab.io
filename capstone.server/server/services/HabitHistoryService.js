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

  async getWillByAccountId(accountId) {
    const habitHistory = await dbContext.HabitHistory.find({ accountId: accountId })
    let will = 0
    habitHistory.forEach(history => { will += history.will })
    return will
  }

  async create(data) {
    // Get habit to calculate will
    const habit = await dbContext.Habits.findById(data.habitId)
    data.will = habit.difficulty * 10
    // Set today's date onto object
    const today = new Date()
    data.month = today.getMonth()
    data.day = today.getDate()
    // Check if one already exists with today's date
    const existing = await dbContext.HabitHistory.findOne(data)
    if (existing == null) {
      const newHabitHistory = await dbContext.HabitHistory.create(data)
      return newHabitHistory
    } else return 'Already completed today'
  }
}

export const habitHistoryService = new HabitHistoryService()
