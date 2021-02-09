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
}
