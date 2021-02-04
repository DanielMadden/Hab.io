import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class MessageService {

  async create(body) {
    return await dbContext.Messages.create(body)
  }
}
export const messageService = new MessageService()
