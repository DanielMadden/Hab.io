import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { badgeService } from "../services/BadgeService"
import { habitsService } from "../services/HabitsService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/query', this.getAccounts)
      .get('/:id/habits', this.getHabitsByAccountId)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccounts(req, res, next) {
    try {
      res.send(accountService.getAccounts(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getHabitsByAccountId(req, res, next){
    try {
      res.send(habitsService.getHabitsByAccountId(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
