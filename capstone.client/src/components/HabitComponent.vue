<template lang="">
  <div class="habit" @click="openHabit">
    <h1 class="habit-header">
      <span class="habit-checkbox pr-3"
            @click="complete"
            :class="{'completed': completed}"
      >
        <i class="far fa-check-square"
           v-if="completed"
        ></i>
        <i class="far fa-square"
           v-if="!completed"
        ></i>
      </span>
      <span class="habit-name">
        {{ habit.name }}
      </span>
    </h1>
    <span class="habit-completed-count">{{ state.today.length }} members completed today</span>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { habitService } from '../services/HabitService'
import { AppState } from '../AppState'
import { habitHistoryService } from '../services/HabitHistoryService'
export default {
  props: {
    habit: {
      type: Object,
      required: true
    }
  },
  setup(props) {
  // props.
    const state = reactive({
      today: []
    })
    const completed = computed(() => state.today.filter(history => history.accountId === AppState.account.id).length)
    onMounted(async() => {
      state.today = await habitHistoryService.getToday(props.habit.id)
    })
    const complete = () => {
      // Check for achievement
      AppState.achievementName = 'Ever Journey Begins With a Single Step'
      AppState.checkAchievement = true
      if (!completed.value) {
        habitHistoryService.create(props.habit.id)
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
