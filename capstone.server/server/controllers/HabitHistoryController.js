import { Auth0Provider } from '@bcwdev/auth0provider'
import { habitHistoryService } from '../services/HabitHistoryService'
import BaseController from '../utils/BaseController'

export class HabitHistoryController extends BaseController {
  constructor() {
    super('api/habithistory')
    this.router
      .get('/day/:habitId', this.getToday)
      .get('/account/:accountId', this.getAccountToday)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getToday(req, res, next) {
    try {
      res.send(await habitHistoryService.getToday(req.params.habitId))
    } catch (error) {
      next(error)
    }
  }

  async getAccountToday(req, res, next) {
    try {
      res.send(await habitHistoryService.getAccountToday(req.params.accountId))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      res.send(await habitHistoryService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
}
