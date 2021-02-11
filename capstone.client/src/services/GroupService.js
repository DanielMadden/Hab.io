import { AppState } from '../AppState'
import GroupImage from '../models/GroupImage'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
import { api, imageApi } from './AxiosService'

const baseURL = '/api/groups/'
const imageURL = '/search/photos/?client_id=RZut9BxYX0J7jAX600d6LQtht5hME7AR0RgV1mGoSkU&page=1&per_page=6&query='
// const baseURLQuery = '/api/groups?'

class GroupService {
  async getPublicGroups() {
    const res = await api.get(baseURL)
    AppState.publicGroups = res.data.filter(group => group.private === false)
  }

  async getAccountGroups(accountId, myAccount = false) {
    const res = await api.get('account/' + accountId + '/groups')
    myAccount ? AppState.myGroups = res.data : AppState.accountGroups = res.data
  }

  async getGroup(groupId, groupPage = false) {
    const res = await api.get(baseURL + groupId)
    groupPage ? AppState.activeGroup = res.data : AppState.activeGroupInfo = res.data
  }
  // api/group/:id/groupmembers

  async createGroup(data) {
    const res = await api.post(baseURL, data)
    logger.log('api response data before setting to appstate' + res.data)
    AppState.activeGroup = res.data
  }

  async editGroup(data, groupId) {
    await api.put(baseURL + groupId, data)
    this.getGroup(groupId, true)
    accountService.getGroupMembersByAccountId(AppState.account.id)
  }

  async deleteGroup(groupId) {
    await api.delete(baseURL + groupId)
  }

  async getImagesForGroup(groupName) {
    const res = await imageApi.get(imageURL + groupName)
    AppState.groupImages = res.data.results.map(i => new GroupImage(i))
  }

  async getImagesForAccount(groupName) {
    const res = await imageApi.get(imageURL + groupName)
    AppState.accountImages = res.data.results.map(i => new GroupImage(i))
  }
}

export const groupService = new GroupService()
