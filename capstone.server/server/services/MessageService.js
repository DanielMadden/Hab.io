import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import socketService from './SocketService'
// import { groupService } from '../services/GroupService'

class MessageService {
  async create(body, userId) {
    const memberCheck = await dbContext.GroupMembers.findOne({ memberId: userId, groupId: body.groupId })
    if (!memberCheck) {
      throw new BadRequest('Invalid group or user does not belong to group')
    }
    const newMessage = await dbContext.Messages.create(body)
    const populatedMessage = await dbContext.Messages.findOne(newMessage).populate('creator')
    socketService.messageRoom(newMessage.groupId, 'create:message', populatedMessage)
    return newMessage
  }

  async getMessagesByGroupId(query = {}, userId, groupId) {
    const memberCheck = await dbContext.GroupMembers.findOne({ memberId: userId, groupId: groupId })
    if (!memberCheck) {
      throw new BadRequest('Invalid group or user does not belong to group')
    }
    const messages = await dbContext.Messages.find(query).populate('creator')
    if (!messages) {
      throw new BadRequest('Invalid Id')
    }
    return messages
  }
}
export const messageService = new MessageService()
