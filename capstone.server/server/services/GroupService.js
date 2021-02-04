import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { groupMemberService } from '../services/GroupMemberService'

class GroupService {
  async find(query = {}) {
    const groups = await dbContext.Groups.find(query).populate('creator')
    return groups
  }

  async findById(id) {
    const group = await dbContext.Groups.findById({ _id: id }).populate('creator')
    if (!group) {
      throw new BadRequest('Invalid Id')
    }
    return group
  }

  async create(group) {
     const newGroup = await dbContext.Groups.create(group)
     console.log(newGroup + "Does this object have a groupId?")
     const newGroupMember = {memberId: group.creatorId, groupId: newGroup.id, status: 'Moderator'}
     groupMemberService.create(newGroupMember)
     return newGroup
  }

  async edit(group) {
    const grp = await dbContext.Groups.findOneAndUpdate({ _id: group.id }, group, { new: true }).populate('creator')
    if (!grp) {
      throw new BadRequest('You are not the user, or this is not a valid group')
    }
    return grp
  }

  async delete(id) {
    const group = await dbContext.Groups.findOneAndRemove({ _id: id })
    if (!group) {
      throw new BadRequest('You are not the user, or this is not a valid group')
    }
    return group
  }
}

export const groupService = new GroupService()
