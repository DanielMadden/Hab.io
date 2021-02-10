import { AppState } from '../AppState'

export const closeModals = () => {
  AppState.darken = false
  AppState.showModal = false
  AppState.showMyGroups = false
  AppState.showGroupInfo = false
  AppState.showAddGroupForm = false
  AppState.showAddHabitForm = false
  AppState.showInviteModal = false
  AppState.showHabitInfo = false
  AppState.showFollowing = false
  AppState.showFollowers = false
  AppState.showBadges = false
  AppState.showAccountGroups = false
  AppState.showEditAccount = false
  AppState.showGroupSettings = false
}
