<template>
  <div class="myModal-content">
    <div class="myModal-frame">
      <h1 class="habit-header">
        <span class="habit-checkbox pr-3"
              @click="complete"
              :class="{'completed': completed}"
              v-if="state.activeGroupMember.status === 'Moderator' || state.activeGroupMember.status === 'Member'"
        >
          <i class="far fa-check-square"
             v-if="completed || state.temp"
          ></i>
          <i class="far fa-square"
             v-else-if="!completed"
          ></i>
        </span>
        <span class="habit-name">
          {{ habit.name }}
        </span>
      </h1>
      <h4 class="habit-group-name" v-if="state.page === 'Account'">
        {{ habit.groupId.name }}
      </h4>
      <span>{{ habit.description }}</span>
    </div>
    <div class="myModal-footer"
         :class="{'flex-column': state.activeGroupMember.status === 'Moderator'}"
    >
      <span class="habit-completed-count">{{ state.today.length }} members completed today</span>
      <button v-if="state.activeGroupMember.status === 'Moderator'"
              class="myModal-button mt-3"
              id="habit-button-trash"
              @click="deleteHabit"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { habitHistoryService } from '../services/HabitHistoryService'
import { groupMemberService } from '../services/GroupMemberService'
import { useRoute } from 'vue-router'
import { closeModals } from '../utils/Modal'
import { habitService } from '../services/HabitService'
// import { accountService } from '../services/AccountService'
export default {
  setup() {
    const route = useRoute()
    const habit = computed(() => AppState.activeHabit)
    const state = reactive({
      today: [],
      temp: 0,
      activeGroupMember: {},
      page: 'GroupDetails'
    })
    const completed = computed(() => state.today.filter(history => history.accountId === AppState.account.id).length)
    const complete = async() => {
      // Check for achievement
      AppState.achievementName = 'Ever Journey Begins With a Single Step'
      AppState.checkAchievement = true
      if (!completed.value) {
        state.temp = 1
        await habitHistoryService.create(habit.value.id)
        state.today = await habitHistoryService.getToday(habit.value.id)
        state.temp = 0
      }
    }
    onMounted(async() => {
      state.today = await habitHistoryService.getToday(habit.value.id)
      if (route.path.includes('account')) state.page = 'Account'
      const waitForHabit = setInterval(() => {
        if (habit.value) {
          getActiveGroupMember()
          clearInterval(waitForHabit)
        }
      }, 100)
    })
    const getActiveGroupMember = async() => {
      state.activeGroupMember = await groupMemberService.getActiveGroupMember(habit.value.groupId.id, true)
    }
    const deleteHabit = () => {
      closeModals()
      if (state.page === 'Groupdetails') {
        const index = AppState.activeGroupHabits.findIndex(groupHabit => groupHabit.id === habit.value.id)
        AppState.activeGroupHabits.splice(index, 1)
      } else if (state.page === 'Account') {
        const index = AppState.accountHabits.findIndex(accountHabit => accountHabit.id === habit.value.id)
        AppState.accountHabits.splice(index, 1)
      }
      habitService.deleteHabit(habit.value.id)
    }
    return { habit, completed, complete, state, deleteHabit }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
@import "../assets/css/habit.css";
</style>
