import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { messageService } from '../services/MessageService'
export class MessageController extends BaseController {
  constructor() {
    super('api/messages')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await messageService.create(req.body, req.userInfo.id)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }
}
