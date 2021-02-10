// import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
// import { accountService } from './AccountService'
import { api } from './AxiosService'

const baseURL = '/api/habithistory/'

class HabitHistoryService {
  async create(habitId) {
    const res = await api.post(baseURL, { habitId: habitId })
    console.log(res)
  }
}

export const habitHistoryService = new HabitHistoryService()
