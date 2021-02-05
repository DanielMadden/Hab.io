import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  badges: [],
  // Account Variables
  user: {},
  account: {},
  accountFollowing: [],
  accountFollowers: [],
  accountBadges: [],
  accountHabits: [],
  accountGroups: [],
  // Group Variables
  myGroups: [],
  publicGroups: [],
  groupHabits: [],
  groupMessages: [],
  // Active Variables
  activeGroup: {},
  activeGroupInfo: {},
  activeHabit: {},
  // Visual Variables
  darken: true,
  showMyGroups: true
})
