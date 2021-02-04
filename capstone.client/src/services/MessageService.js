import { AppState } from '../AppState'
import { api } from './AxiosService'

const baseURL = '/api/messages'

class MessageService {
  async getGroupMessages(groupId) {
    const res = await api.get('/api/groups/' + groupId + '/messages')
    AppState.groupMessages = res.data
  }

  async sendMessage(data) {
    await api.post(baseURL, data)
    this.getGroupMessages(data.groupId)
  }
}

export const messageService = new MessageService()
