import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class BadgeService {
  async create(body) {
    return await dbContext.Badges.create(body)
  }
}
export const badgeService = new BadgeService()
