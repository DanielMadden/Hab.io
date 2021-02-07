import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/groups/'
// const baseURLQuery = '/api/groups?'

class GroupService {
  async getPublicGroups() {
    const res = await api.get(baseURL)
    AppState.publicGroups = res.data
  }

  async getAccountGroups(accountId, myAccount = false) {
    const res = await api.get('account/' + accountId + '/groups')
    console.log(res)
    myAccount ? AppState.myGroups = res.data : AppState.accountGroups = res.data
  }

  async getGroup(groupId, groupPage = false) {
    const res = await api.get(baseURL + groupId)
    groupPage ? AppState.activeGroup = res.data : AppState.activeGroupInfo = res.data
  }
  // api/group/:id/groupmembers

  async createGroup(data) {
    await api.post(baseURL, data)
  }

  async editGroup(data, groupId) {
    await api.put(baseURL + groupId, data)
  }

  async deleteGroup(groupId) {
    await api.delete(baseURL + groupId)
  }
}

export const groupService = new GroupService()
