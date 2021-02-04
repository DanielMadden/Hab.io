import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { groupService } from '../services/GroupService'
import { groupMemberService } from "../services/GroupMemberService"
import { messageService } from "../services/MessageService"
export class GroupController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get(':id/groupMembers', this.getGroupMembersByGroupId)
      .get('/:id/messages', this.getMessagesByGroupId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await groupService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const data = await groupService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getGroupMembersByGroupId(req, res, next) {
    try {
      const data = await groupMemberService.getGroupMembersByGroupId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getMessagesByGroupId(req, res, next) {
    try {
      const data = await messageService.getMessagesByGroupId({ groupId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await groupService.create(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await groupService.edit(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await groupService.delete(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
