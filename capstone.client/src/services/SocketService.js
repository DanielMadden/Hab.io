import { AppState } from '../AppState'

const { SocketHandler } = require('../utils/SocketHandler')

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('create:message', this.createMessage)
  }

  async authenticate(token) {
    this.socket.emit('authenticate', token)
  }

  async createMessage(message) {
    if (message.groupId === AppState.activeGroup.id) {
      AppState.activeGroupMessages.push(message)
    }
  }
}

export const socketService = new SocketService()
