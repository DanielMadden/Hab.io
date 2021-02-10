// import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
// import { accountService } from './AccountService'
// import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/habithistory/'

class HabitHistoryService {
  async getToday(habitId) {
    const res = await api.get(baseURL + 'day/' + habitId)
    return res.data
  }

  async create(habitId) {
    const res = await api.post(baseURL, { habitId: habitId })
    console.log(res)
  }
}

export const habitHistoryService = new HabitHistoryService()
