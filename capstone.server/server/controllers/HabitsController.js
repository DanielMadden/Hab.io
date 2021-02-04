import { habitsService } from "../services/HabitsService"
import BaseController from "../utils/BaseController"

export class HabitsController extends BaseController {
  constructor() {
    super('api/habits')
    this.router
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }
  async getById(req, res, next){
try {
  res.send(habitsService.getById(req.params.id))
} catch (error) {
  next(error)
}
  }
  async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      res.send(habitsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next){
    try {
      res.send(habitsService.edit(req.params.id, req.body, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next){
    try {

      res.send(habitsService.delete(req.params.id, req.userInfo.id)
    } catch (error) {
      next(error)
    }
  }
}