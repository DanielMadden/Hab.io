<template lang="">
  <div class="habit" @click="openHabit">
    <h1 class="habit-header">
      <span class="habit-checkbox pr-3"
            @click="clickTest"
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
    <span class="habit-completed-count">{{ habit.completed.length }} members completed today</span>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
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
    const status = reactive({
      localCompleted: props.habit.completed.includes(AppState.account.id)
    })
    const completed = computed(() => props.habit.completed.includes(AppState.account.id))
    const complete = () => {
      // Check for achievement
      AppState.achievementName = 'Ever Journey Begins With a Single Step'
      AppState.checkAchievement = true
      if (!completed.value) {
        habitService.completeHabit(props.habit.id, props.habit.groupId)
      }
    }
    const clickTest = () => {
      habitHistoryService.create(props.habit.id)
    }
    const openHabit = () => {
      AppState.activeHabit = props.habit
      habitService.getHabit(props.habit.id)
      AppState.darken = true
      AppState.showModal = true
      AppState.showHabitInfo = true
    }
    return { complete, status, openHabit, completed, clickTest }
  }
}
</script>
<style scoped>
@import "../assets/css/habit.css";
@import "../assets/css/global.css";
</style>
