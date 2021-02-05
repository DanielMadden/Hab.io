import { api } from './AxiosService'

const baseURL = '/api/groupmembers/'
const baseURLQuery = '/api/groupmembers?'

class GroupMemberService {
  async joinGroup(accountId, groupId) {
    await api.post(baseURL, { accountId: accountId, groupId: groupId })
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
