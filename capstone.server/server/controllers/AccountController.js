import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
// import { badgeService } from '../services/BadgeService'
import { habitService } from '../services/HabitService'
import { followService } from '../services/FollowService'
import BaseController from '../utils/BaseController'
import { groupService } from '../services/GroupService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/query', this.getAccountsByQuery)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      // .get('', this.getAccounts)
      .get('/:id/groups', this.getGroupsByAccountId)
      .get('/:id/habits', this.getHabitsByAccountId)
      .get('/:id/followers', this.getFollowersByAccountId)
      .get('/:id/followees', this.getFolloweesByAccountId)
      .put('/:id', this.edit)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountsByQuery(req, res, next) {
    try {
      const data = await accountService.getAccountsByQuery(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAccounts(req, res, next) {
    try {
      const data = await accountService.getAccounts(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getGroupsByAccountId(req, res, next) {
    try {
      const data = await groupService.getGroupsByAccountId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getHabitsByAccountId(req, res, next) {
    try {
      const data = await habitService.getHabitsByAccountId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getFollowersByAccountId(req, res, next) {
    try {
      const data = await followService.getFollowsByAccountId({ followeeId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getFolloweesByAccountId(req, res, next) {
    try {
      const data = await followService.getFollowsByAccountId({ followerId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const accountUpdate = {}
      accountUpdate.name = req.body.name
      accountUpdate.picture = req.body.picture
      const data = await accountService.edit(accountUpdate, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
