import { api } from './AxiosService'

const baseURL = '/api/follows/'
const baseURLQuery = '/api/follows?'

class FollowService {
  async follow(followerId, followeeId) {
    await api.post(baseURL, { follower: followerId, followee: followeeId })
  }

  async unfollow(followerId, followeeId) {
    await api.delete(baseURLQuery + 'follower=' + followerId + '&followee=' + followeeId)
  }
}

export const followService = new FollowService()
