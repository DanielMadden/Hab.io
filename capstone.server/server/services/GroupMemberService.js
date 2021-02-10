import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GroupMemberService {
  async getGroupMembersByAccountId(accountId) {
    return await dbContext.GroupMembers.find({ memberId: accountId }).populate('groupId member')
  }

  async getActiveGroupMember(groupId, accountId) {
    const groupMember = await dbContext.GroupMembers.find({ groupId: groupId, memberId: accountId }).populate('memberId')
    if (!groupMember) return 'No relationship'
    return groupMember
  }

  async getGroupMembersByGroupId(groupId) {
    return dbContext.GroupMembers.find({ groupId: groupId }).populate('memberId')
  }

  async create(groupMember) {
    const joined = await dbContext.GroupMembers.findOne({ groupId: groupMember.groupId, memberId: groupMember.memberId })
    if (joined) return 'Member already joined this group'
    return await dbContext.GroupMembers.create(groupMember)
  }

  async inviteToPrivateGroup(groupMember, inviterId) {
    const inviter = await dbContext.GroupMembers.findById(inviterId)
    if (inviter.status === 'Moderator') {
      return await dbContext.GroupMembers.create(groupMember)
    }
  }

  async edit(groupMemberId, update, accountId) {
    const groupMember = (await dbContext.GroupMembers.findById(groupMemberId)).toObject()
    if (groupMember.status === 'Moderator') {
      return dbContext.GroupMembers.findOneAndUpdate(groupMemberId, update)
    }
  }

  async leaveGroup(groupMemberId, accountId) {

  }

  async delete(groupMemberId, accountId) {
    // if not working put a breakpoint and hover over the variables
    const groupMember = await (await dbContext.GroupMembers.findById(groupMemberId)).toObject()
    const group = await (await dbContext.Groups.findById(groupMember.groupId)).toObject()
    const currentGroupMember = await (await dbContext.GroupMembers.findOne({ memberId: accountId, groupId: groupMember.id })).toObject()
    if (group.creatorId !== accountId) {
      if (groupMember.memberId === accountId || currentGroupMember.status === 'Moderator') {
        return dbContext.GroupMembers.findOneAndRemove(groupMemberId)
      } else {
        return new BadRequest('You are not authorized')
      }
    } else {
      return new BadRequest('You cannot leave a group you created')
    }
  }
}
export const groupMemberService = new GroupMemberService()
