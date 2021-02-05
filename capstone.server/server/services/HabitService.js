import { dbContext } from "../db/DbContext";
import { BadRequest } from '../utils/Errors'

class HabitService {
  async getById(habitId) {
    return await dbContext.Habits.find({id: habitId})
  }
  async getHabitsByAccountId(accountId) {
    const groups = await dbContext.GroupMembers.find({memberId: accountId});
    const groupIds = groups.map(group=>group.groupId)
    // groups.forEach(group => groupIds.push(group.groupId))
    return await dbContext.Habits.find({groupId: {$in: groupIds}})
  }
  async create(habit) {
    return await dbContext.Habits.create(habit)
  }
  async edit(habitId, update, accountId) {
    const habit = await dbContext.Habits.findById(habitId)
    const member = await dbContext.GroupMembers.find({memberId: accountId, groupId: habit.groupId })
    if(member.status == 'Moderator') {
      return await dbContext.Habits.findByIdAndUpdate(habitId, update)
    }
    return 'Not Authorized'
  }
  async delete(habitId, userId) {
    throw new Error("Method not implemented.");
  }
  async getHabitsByGroupId(query = {}, userId, groupId) {
    const memberCheck = await dbContext.GroupMembers.findOne({memberId: userId, groupId: groupId})
    if (!memberCheck) {
      throw new BadRequest('Invalid group or user does not belong to group')
    }
    const habits = await dbContext.Habits.find(query)
    if (!habits) {
      throw new BadRequest('Invalid Id')
    }
    return habits
  }
}

export const habitService = new HabitService()