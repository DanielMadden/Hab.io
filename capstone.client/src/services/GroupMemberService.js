import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { accountService } from './AccountService'
import { api } from './AxiosService'

const baseURL = '/api/groupMembers/'
const baseURLQuery = '/api/groupMembers?'

class GroupMemberService {
  async getGroupMembers(groupId) {
    const res = await api.get('/api/groups/' + groupId + '/groupMembers')
    AppState.activeGroupMembers = res.data
  }

  async getActiveGroupMember(groupId, habitCheck = false) {
    const res = await api.get('/api/groups/' + groupId + '/activeGroupMember')
    if (!habitCheck)AppState.activeGroupMember = res.data
    else return res.data
  }

  async joinGroup(accountId, groupId) {
    const res = await api.post(baseURL, { memberId: accountId, groupId: groupId })
    // Check for achievement
    try {
      AppState.achievementName = 'Goal Setting'
      AppState.checkAchievement = true
    } catch (error) {
      logger.error(error)
    }
    return res.data
  }

  async sendGroupInvite(inviteeId, groupId) {
    const res = await api.post(baseURL + 'invite', { memberId: inviteeId, groupId: groupId })
    await groupMemberService.getGroupMembers(groupId)
    return res.data
  }

  async acceptGroupInvite(groupMemberId) {
    const res = await api.post(baseURL + groupMemberId + '/accept')
    this.getActiveGroupMember(res.data.groupId)
    this.getGroupMembers(res.data.groupId)
    accountService.getGroupMembersByAccountId(res.data.memberId)
  }

  async declineGroupInvite(groupMemberId) {
    const res = await api.post(baseURL + groupMemberId + '/decline')
    this.getActiveGroupMember(res.data.groupId)
    this.getGroupMembers(res.data.groupId)
    accountService.getGroupMembersByAccountId(res.data.memberId)
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
