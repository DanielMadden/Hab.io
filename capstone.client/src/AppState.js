import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  badges: [],
  user: {},
  account: {},
  accountFollowing: [],
  accountFollowers: [],
  accountBadges: [],
  accountHabits: [],
  accountGroups: [],
  myGroups: [],
  publicGroups: [],
  groupHabits: [],
  groupMessages: [],
  activeGroup: {},
  activeGroupInfo: {},
  activeHabit: {}
})
