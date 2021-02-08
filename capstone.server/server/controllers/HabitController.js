import { Auth0Provider } from '@bcwdev/auth0provider'
import { habitService } from '../services/HabitService'
import BaseController from '../utils/BaseController'

export class HabitController extends BaseController {
  constructor() {
    super('api/habits')
    this.router
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .put('/:id/complete', this.complete)
      .delete('/:id', this.delete)
  }

  async getById(req, res, next) {
    try {
      const data = await habitService.getById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await habitService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const data = await habitService.edit(req.params.id, req.body, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async complete(req, res, next) {
    try {
      const data = await habitService.complete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await habitService.delete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
