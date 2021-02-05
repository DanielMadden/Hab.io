import { habitService } from "../services/HabitService"
import BaseController from "../utils/BaseController"

export class HabitController extends BaseController {
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
      res.send(habitService.getById(req.params.id))
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      res.send(habitService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next){
    try {
      res.send(habitService.edit(req.params.id, req.body, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next){
    try {
      res.send(habitService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}