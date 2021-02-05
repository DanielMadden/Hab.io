import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class FollowService {
  async create(follow) {
    return await dbContext.Follows.create(follow)
  }

  async delete(followId) {
    return await dbContext.Follows.findOneAndRemove(followId)
  }

  async getFollowsByAccountId(query) {
    const follows = await dbContext.Follows.find(query)
    if (!follows) {
      throw new BadRequest('Invalid Id')
    }
    return follows
  }
}

export const followService = new FollowService()
