import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/habits/'

class HabitService {
  async getGroupHabits(groupId) {
    const res = await api.get('/api/groups/' + groupId + '/habits')
    AppState.activeGroupHabits = res.data
  }

  async getAccountHabits(accountId) {
    const res = await api.get('/api/accounts/' + accountId + '/habits')
    AppState.accountHabits = res.data
  }

  async getHabit(habitId) {
    const res = await api.get(baseURL + habitId)
    AppState.activeHabit = res.data
  }

  async createHabit(data) {
    await api.post(baseURL, data)
    this.getGroupHabits(data.groupId)
  }

  async editHabit(data, habitId) {
    const res = await api.put(baseURL + habitId, data)
    this.getGroupHabits(res.data.groupId)
  }

  async completeHabit(habitId) {
    const res = await api.put(baseURL + habitId + '/complete')
    console.log(res)
    this.getGroupHabits(res.data.groupId)
  }

  async deleteHabit(habitId) {
    const res = await api.delete(baseURL + habitId)
    this.getGroupHabits(res.data.groupId)
  }
}

export const habitService = new HabitService()
