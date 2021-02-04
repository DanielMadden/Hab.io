import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/badges/'

class BadgeService {
  async getBadges() {
    const res = await api.get(baseURL)
    AppState.badges = res.data
  }

  async getAccountBadges(accountId) {
    const res = await api.get(baseURL + accountId + 'badges')
    AppState.accountBadges = res.data
  }
}

export const badgeService = new BadgeService()
