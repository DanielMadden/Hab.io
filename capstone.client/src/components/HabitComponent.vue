<template lang="">
  <div class="habit" @click="openHabit">
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
    <span class="habit-completed-count">{{ state.today.length }} members completed today</span>
    <p>{{ state.inGroup }}</p>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { habitService } from '../services/HabitService'
import { AppState } from '../AppState'
import { habitHistoryService } from '../services/HabitHistoryService'
import { groupMemberService } from '../services/GroupMemberService'
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
export default {
  props: {
    habit: {
      type: Object,
      required: true
    }
  },
  setup(props) {
  // props.
    const route = useRoute()
    const state = reactive({
      today: [],
      temp: 0,
      activeGroupMember: {}
    })
    const completed = computed(() => state.today.filter(history => history.accountId === AppState.account.id).length)
    onMounted(async() => {
      state.today = await habitHistoryService.getToday(props.habit.id)
      const waitForLogin = setInterval(() => {
        if (AppState.user.isAuthenticated) {
          getActiveGroupMember()
          clearInterval(waitForLogin)
        }
      }, 100)
    })
    const getActiveGroupMember = async() => {
      state.activeGroupMember = await groupMemberService.getActiveGroupMember(props.habit.groupId.id, true)
    }
    const complete = async() => {
      window.event.stopPropagation()
      // Check for achievement
      AppState.achievementName = 'Ever Journey Begins With a Single Step'
      AppState.checkAchievement = true
      if (!completed.value) {
        state.temp = 1
        await habitHistoryService.create(props.habit.id)
        state.today = await habitHistoryService.getToday(props.habit.id)
        accountService.getWill(route.params.email)
        state.temp = 0
      }
    }
    const openHabit = () => {
      AppState.activeHabit = props.habit
      AppState.activeHabitToday = state.today
      habitService.getHabit(props.habit.id)
      habitService.getHabitToday(props.habit.id)
      AppState.darken = true
      AppState.showModal = true
      AppState.showHabitInfo = true
    }
    return { complete, state, openHabit, completed }
  }
}
</script>
<style scoped>
@import "../assets/css/habit.css";
@import "../assets/css/global.css";
</style>
