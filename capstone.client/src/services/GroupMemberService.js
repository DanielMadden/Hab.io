import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/groupmembers/'
const baseURLQuery = '/api/groupmembers?'

class GroupMemberService {
  async getGroupMembers(groupId) {
    const res = await api.get('/api/groups/' + groupId + '/groupMembers')
    AppState.activeGroupMembers = res.data
  }

  async joinGroup(accountId, groupId) {
    const res = await api.post(baseURL, { memberId: accountId, groupId: groupId })
    return res.data
  }

  async sendGroupInvite(inviteeId, groupId) {
    await api.post(baseURL, { memberId: inviteeId, groupId: groupId })
  }

  async leaveGroup(accountId, groupId) {
    await api.delete(baseURLQuery + 'accountId=' + accountId + '&groupId=' + groupId)
  }

  // @param status is type String
  async editStatus(accountId, groupId, status) {
    await api.put(baseURLQuery + 'accountId=' + accountId + '&groupId=' + groupId, { status: status })
  }
}

export const groupMemberService = new GroupMemberService()
