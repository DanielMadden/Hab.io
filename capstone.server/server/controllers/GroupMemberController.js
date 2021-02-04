import BaseController from "../utils/BaseController";
// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'


export class GroupMemberService extends BaseController {
  constructor() {
    super('api/badges')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }
}