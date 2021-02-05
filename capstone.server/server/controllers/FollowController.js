import { followService } from "../services/FollowService"
import BaseController from "../utils/BaseController"
import { Auth0Provider } from '@bcwdev/auth0provider'

export class FollowController extends BaseController {
  constructor() {
    super('api/follows')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }
  async create(req, res, next){
    try {
      // TODO
      res.send(followService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next){
    try {
      // TODO
      res.send(followService.delete())
    } catch (error) {
      next(error)
    }
  }
}