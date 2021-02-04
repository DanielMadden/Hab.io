import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { badgeService } from '../services/BadgeService'
export class BadgeController extends BaseController {
  constructor() {
    super('api/badges')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      const data = await badgeService.create(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }
}
