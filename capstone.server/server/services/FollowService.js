import { dbContext } from "../db/DbContext";
import { BadRequest } from '../utils/Errors'

class FollowService {
  async create(follow) {
    return await dbContext.Follows.create(follow)
  }
  async delete() {
    // TODO
    throw new Error("Method not implemented.");
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