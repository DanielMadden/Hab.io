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
  accountSearchResults: [],
  // Group Variables
  myGroups: [],
  myGroupMembers: [],
  publicGroups: [],
  groupImages: [],
  // Active Variables
  activeGroup: {},
  activeAccount: {},
  activeGroupHabits: [],
  activeGroupMessages: [],
  activeGroupMembers: [],
  activeGroupInfo: {}, // (when viewing group modal on home)
  activeHabit: {}, // (when viewing habit modal on groupdetails)
  // Visual Variables
  darken: false,
  showMyGroups: false,
  showModal: false,
  showGroupInfo: false,
  showAddGroupForm: false,
  showAddHabitForm: false
})
