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
        <!-- {{ completed }} -->
        </span>
        <span class="habit-name">
          {{ habit.name }}
        </span>
      </h1>
      <p class="m-0 p-0">
        {{ habit.description }}
      </p>
    </div>
    <div class="myModal-footer">
      {{ habit.completed.length }} completed today
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { habitService } from '../services/HabitService'
export default {
  setup() {
    const habit = computed(() => AppState.activeHabit)
    const completed = computed(() => habit.value.completed.includes(AppState.account.id))
    const complete = () => {
      // Check for achievement
      AppState.achievementName = 'Ever Journey Begins With a Single Step'
      AppState.checkAchievement = true
      window.event.stopPropagation()
      if (!completed.value) {
        habitService.completeHabit(habit.value.id, habit.value.groupId)
      }
    }
    return { habit, completed, complete }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
@import "../assets/css/habit.css";
</style>
