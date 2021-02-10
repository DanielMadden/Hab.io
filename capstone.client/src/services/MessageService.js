import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/messages'

class MessageService {
  async getGroupMessages(groupId) {
    console.log('getting group messages...')
    const res = await api.get('/api/groups/' + groupId + '/messages')
    AppState.activeGroupMessages = res.data
    console.log(AppState.activeGroupMessages)
  }

  async sendMessage(data) {
    await api.post(baseURL, data)
    this.getGroupMessages(data.groupId)
  }
}

export const messageService = new MessageService()
