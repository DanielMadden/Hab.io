import BaseController from '../utils/BaseController'
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { groupService } from '../services/GroupService'
import { groupMemberService } from '../services/GroupMemberService'
import { messageService } from '../services/MessageService'
import { habitService } from '../services/HabitService'

export class GroupController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/groupMembers', this.getGroupMembersByGroupId) // TODO: This should use auth and check if the caller belongs to the group
      .get('/:id/activeGroupMember', this.getActiveGroupMember) // TODO: This should use auth and check if the caller belongs to the group
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/messages', this.getMessagesByGroupId)
      .get('/:id/habits', this.getHabitsByGroupId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await groupService.getAll(req.query)
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

  async getActiveGroupMember(req, res, next) {
    try {
      req.body.memberId = req.userInfo.id
      const data = await groupMemberService.getActiveGroupMember(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getMessagesByGroupId(req, res, next) {
    try {
      const data = await messageService.getMessagesByGroupId({ groupId: req.params.id }, req.userInfo.id, req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getHabitsByGroupId(req, res, next) {
    try {
      const data = await habitService.getHabitsByGroupId({ groupId: req.params.id }, req.userInfo.id, req.params.id)
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
