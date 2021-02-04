import BaseController from "../utils/BaseController";
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { groupMemberService } from "../services/GroupMemberService";


export class GroupMemberService extends BaseController {
  constructor() {
    super('api/groupMembers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this. edit)
      .delete('/:id', this.delete)
  }
async create(req,res,next){
  try {
    req.body.status = "Member"
    res.send(groupMemberService.create(req.body))
  } catch (error) {
    next(error)
  }
}
async edit(req,res,next){
  try {
    status
    res.send(groupMemberService.edit(req.params.id, req.body.status, req.userInfo.id))
  } catch (error) {
    next(error)
  }
}
async delete(req,res,next){
  try {
    res.send(groupMemberService.delete(req.params.id, req.userInfo.id))
  } catch (error) {
    next(error)
  }
}

}
