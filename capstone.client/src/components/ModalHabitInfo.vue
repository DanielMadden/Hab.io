<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
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
    </div>
    <div class="myModal-footer">
      <span class="habit-completed-count">{{ today.length }} members completed today</span>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { habitHistoryService } from '../services/HabitHistoryService'
export default {
  setup() {
    const habit = computed(() => AppState.activeHabit)
    const today = computed(() => AppState.activeHabitToday)
    const completed = computed(() => today.value.filter(history => history.accountId === AppState.account.id).length)
    const complete = () => {
      // Check for achievement
      AppState.achievementName = 'Ever Journey Begins With a Single Step'
      AppState.checkAchievement = true
      if (!completed.value) {
        habitHistoryService.create(habit.value.id)
      }
    }
    return { habit, completed, complete, today }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
@import "../assets/css/habit.css";
</style>
