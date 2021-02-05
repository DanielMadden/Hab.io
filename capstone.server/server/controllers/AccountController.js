import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { badgeService } from "../services/BadgeService"
import { habitService } from "../services/HabitService"
import { followService } from "../services/FollowService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/query', this.getAccounts)
      .get('/:id/habits', this.getHabitsByAccountId)
      .get('/:id/followers', this.getFollowersByAccountId)
      .get('/:id/followees', this.getFolloweesByAccountId)
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
      res.send(habitService.getHabitsByAccountId(req.params.id))
    } catch (error) {
      next(error)
    }
  }
  async getFollowersByAccountId(req, res, next){
    try {
      res.send(followService.getFollowsByAccountId({ followeeId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
  async getFolloweesByAccountId(req, res, next){
    try {
      res.send(followService.getFollowsByAccountId({ followerId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }
}
