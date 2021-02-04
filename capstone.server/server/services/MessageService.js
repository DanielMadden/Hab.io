import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class MessageService {

  async create(body) {
    return await dbContext.Messages.create(body)
  }

  async getMessagesByGroupId(query = {}) {
    const notes = await dbContext.Messages.find(query).populate('creator')
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }
}
export const messageService = new MessageService()
