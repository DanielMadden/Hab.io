import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const emailQueryURL = '/account/email?email='

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getSelected(email) {
    try {
      const res = await api.get(emailQueryURL + email)
      AppState.activeAccount = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getAccountsByQuery(query) {
    try {
      // TODO test that this query syntax is passed and handled properly
      const res = await api.get(`/account/query?search=${query}`)
      AppState.accountSearchResults = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getGroups(email) {
    const account = await api.get(emailQueryURL + email)
    const res = await api.get('/account/' + account.data.id + '/groups')
    AppState.accountGroups = res.data
  }

  async getFollowers(email) {
    const account = await api.get(emailQueryURL + email)
    const res = await api.get('/account/' + account.data.id + '/followers')
    AppState.accountFollowers = res.data
  }

  async getFollowing(email) {
    const account = await api.get(emailQueryURL + email)
    const res = await api.get('/account/' + account.data.id + '/followees')
    AppState.accountFollowing = res.data
  }

  async getWill(email) {
    const account = await api.get(emailQueryURL + email)
    const res = await api.get('/account/' + account.data.id + '/will')
    AppState.activeAccountWill = res.data
  }

  async followUser(body) {
    const res = await api.post('api/follows', body)
    AppState.accountFollowers.push(res.data)
  }

  async getHabits(email) {
    const account = await api.get(emailQueryURL + email)
    const res = await api.get('/account/' + account.data.id + '/habits')
    AppState.accountHabits = res.data
  }

  async getGroupMembersByAccountId(id) {
    try {
      const res = await api.get('/account/' + id + '/groupMembers')
      AppState.myGroupMembers = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async edit(id, name) {
    try {
      await api.put('/account/' + id, { name: name })
    } catch (error) {
      logger.error(error)
    }
  }

  async editBadges(id, badges) {
    try {
      await api.put('/account/' + id, { badges: badges })
    } catch (error) {
      logger.error(error)
    }
  }

  async editProfile(body) {
    try {
      await api.put('/account/' + body.id, body)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const accountService = new AccountService()
