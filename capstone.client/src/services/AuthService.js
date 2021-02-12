import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { setBearer } from './AxiosService'
import { accountService } from './AccountService'
import { groupService } from './GroupService'
import { socketService } from './SocketService'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  await accountService.getAccount()
  AppState.user = AuthService.user
  // NOTE if there is something you want to do once the user is authenticated, place that here
  socketService.authenticate(AuthService.bearer)
  groupService.getAccountGroups(AppState.account.id, true)
  accountService.getGroupMembersByAccountId(AppState.account.id)
  // Check for achievement
  if (new Date() < new Date('2021-04-01')) {
    AppState.achievementName = 'Early Bird Gets the Worm'
    AppState.checkAchievement = true
  }
  if (router.currentRoute.value.name === 'Account') {
    accountService.checkFollowing()
  }
})
