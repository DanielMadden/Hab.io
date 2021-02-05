import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { groupService } from '../services/GroupService'

class MessageService {

  async create(body, userId) {
    const memberCheck = await dbContext.GroupMembers.findOne({memberId: userId, groupId: body.groupId})
    if (!memberCheck) {
      throw new BadRequest('Invalid group or user does not belong to group')
    }
    let ret = await dbContext.Messages.create(body)
    return ret
  }

  async getMessagesByGroupId(query = {}, userId, groupId) {
    const memberCheck = await dbContext.GroupMembers.findOne({memberId: userId, groupId: groupId})
    if (!memberCheck) {
      throw new BadRequest('Invalid group or user does not belong to group')
    }
    const notes = await dbContext.Messages.find(query).populate('creator')
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }
}
export const messageService = new MessageService()
