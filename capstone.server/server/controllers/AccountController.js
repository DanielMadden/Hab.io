import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
// import { badgeService } from '../services/BadgeService'
import { habitService } from '../services/HabitService'
import { followService } from '../services/FollowService'
import BaseController from '../utils/BaseController'
import { groupService } from '../services/GroupService'
import { groupMemberService } from '../services/GroupMemberService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/query', this.getAccountsByQuery)
      .get('/email', this.getAccountByEmail)
      .get('/:id/groups', this.getGroupsByAccountId)
      .get('/:id/habits', this.getHabitsByAccountId)
      .get('/:id/followers', this.getFollowersByAccountId)
      .get('/:id/followees', this.getFolloweesByAccountId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:id/groupMembers', this.getGroupMembersByAccountId)
      // .get('', this.getAccounts)
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
      const name = req.query.search
      const email = req.query.search
      const data = await accountService.getAccountsByQuery(name, email)
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

  async getAccountByEmail(req, res, next) {
    try {
      const data = await accountService.getAccountByEmail(req.query.email)
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

  async getGroupMembersByAccountId(req, res, next) {
    try {
      const data = await groupMemberService.getGroupMembersByAccountId(req.userInfo.id)
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
      if (req.body.name) { accountUpdate.name = req.body.name }
      if (req.body.picture) { accountUpdate.picture = req.body.picture }
      if (req.body.backgroundImage) { accountUpdate.backgroundImage = req.body.backgroundImage }
      if (req.body.badges) { accountUpdate.badges = req.body.badges }
      const data = await accountService.edit(accountUpdate, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
