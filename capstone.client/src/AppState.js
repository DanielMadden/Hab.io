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
  groupImages: [],
  // Active Variables
  activeGroup: {},
  activeGroupHabits: [],
  activeGroupMessages: [],
  activeGroupMembers: [],
  activeGroupInfo: {}, // (when viewing group modal on home)
  activeHabit: {}, // (when viewing habit modal on groupdetails)
  // Visual Variables
  darken: true,
  showMyGroups: false,
  showModal: true,
  showGroupInfo: true
})
