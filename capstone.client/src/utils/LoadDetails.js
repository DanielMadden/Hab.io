
import { socketService } from '../services/SocketService'
import { groupService } from '../services/GroupService'
import { habitService } from '../services/HabitService'
import { groupMemberService } from '../services/GroupMemberService'
import { messageService } from '../services/MessageService'
import { AppState } from '../AppState'

export const loadDetailsPage = (id) => {
  groupService.getGroup(id, true)
  groupMemberService.getGroupMembers(id)
  habitService.getGroupHabits(id)
  const waitForLogin = setInterval(() => {
    if (AppState.user.isAuthenticated) {
      messageService.getGroupMessages(id)
      groupMemberService.getActiveGroupMember(id)
      socketService.emit('join:room', id)
      clearInterval(waitForLogin)
    }
  }, 10)
}
