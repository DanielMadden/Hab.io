import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { groupService } from '../services/GroupService'

class MessageService {

  async create(body) {
    return await dbContext.Messages.create(body)
  }

  async getMessagesByGroupId(query = {}, userId, groupId) {
    const group = await dbContext.Groups.findById({ _id: groupId }).populate('creator')
    if (!group) {
      throw new BadRequest('Invalid groupId')
    }
    // TODO: Use groupMemberService to validate that user belongs to group
    const notes = await dbContext.Messages.find(query).populate('creator')
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }
}
export const messageService = new MessageService()
