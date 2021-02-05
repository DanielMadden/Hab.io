import { habitService } from '../services/HabitService'
import BaseController from '../utils/BaseController'

export class HabitController extends BaseController {
  constructor() {
    super('api/habits')
    this.router
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
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
      req.body.creatorId = req.userInfo.id
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

  async delete(req, res, next) {
    try {
      const data = await habitService.delete(req.params.id, req.userInfo.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
