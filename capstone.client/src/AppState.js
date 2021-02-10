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
  accountSelectedInvitees: [],
  accountImages: [],
  // Group Variables
  myGroups: [],
  myGroupMembers: [],
  publicGroups: [],
  groupImages: [],
  // Active Variables
  activeGroup: {},
  activeAccount: {},
  activeAccountWill: 0,
  activeGroupHabits: [],
  activeGroupMessages: [],
  activeGroupMembers: [],
  activeGroupMember: {}, // (for relationship between user and currently viewed group)
  activeGroupInfo: {}, // (when viewing group modal on home)
  activeHabit: {}, // (when viewing habit modal on groupdetails)
  activeHabitToday: [], // (don't ask.)
  // Visual Variables
  darken: false,
  showMyGroups: false,
  showModal: false,
  showGroupInfo: false,
  showAddGroupForm: false,
  showAddHabitForm: false,
  showInviteModal: false,
  showFollowing: false,
  showFollowers: false,
  showAccountGroups: false,
  showBadges: false,
  showEditAccount: false,
  checkAchievement: false,
  showHabitInfo: false,
  showGroupSettings: false,
  achievementName: null
})
