import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

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
      const res = await api.get('/account/query?email=' + email)
      AppState.activeAccount = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getAccountsByQuery(query) {
    try {
      // TODO test that this query syntax is passed and handled properly
      const res = await api.get(`/account/query?name=${query}&email=${query}`)
      AppState.accountSearchResults = res.data
    } catch (error) {
      logger.error(error)
    }
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

  // async getGroups(id) {
  //   console.log(id)
  // }
}

export const accountService = new AccountService()
