import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { badgeService } from '../services/BadgeService'
export class BadgeController extends BaseController {
  constructor() {
    super('api/badges')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const data = await badgeService.getAll()
      res.send(data)
    } catch (error) {
      next(error)
    }
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
