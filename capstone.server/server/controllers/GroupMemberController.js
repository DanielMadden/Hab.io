import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { groupMemberService } from '../services/GroupMemberService'

export class GroupMemberController extends BaseController {
  constructor() {
    super('api/groupMembers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .post('/invite', this.invite)
      .post('/:id/accept', this.acceptInvite)
      .post('/:id/decline', this.declineInvite)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.status = 'Member'
      const data = await groupMemberService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async invite(req, res, next) {
    try {
      req.body.status = 'Pending'
      const data = await groupMemberService.invite(req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async acceptInvite(req, res, next) {
    try {
      res.send(await groupMemberService.acceptInvite(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async declineInvite(req, res, next) {
    try {
      res.send(await groupMemberService.declineInvite(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const data = await groupMemberService.edit(req.params.id, req.body.status, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await groupMemberService.delete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
