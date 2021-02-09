<template lang="">
  <div class="habit" @click="openHabit">
    <h1 class="habit-name">
      <span class="habit-checkbox" @click="complete">
        <i class="far fa-check-square"
           v-if="status.done"
        ></i>
        <i class="far fa-square"
           v-if="!status.done"
        ></i>
        <!-- {{ completed }} -->
      </span>
      {{ habit.name }}
    </h1>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { habitService } from '../services/HabitService'
import { AppState } from '../AppState'
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
      done: false
    })
    const complete = () => {
      window.event.stopPropagation()
      habitService.completeHabit(props.habit.id, props.habit.groupId)
    }
    const openHabit = () => {
      AppState.activeHabit = props.habit
      habitService.getHabit(props.habit.id)
      AppState.darken = true
      AppState.showModal = true
      AppState.showHabitInfo = true
    }
    const completed = computed(() => props.habit.completed.includes(AppState.account.id))
    return { complete, status, openHabit, completed }
  }
}
</script>
<style scoped>
@import "../assets/css/habit.css";
</style>
