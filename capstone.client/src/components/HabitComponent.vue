<template lang="">
  <div class="habit">
    <h1 class="habit-name">
      <span class="habit-checkbox" @click="complete">
        <i class="far fa-check-square"
           v-if="status.done"
        ></i>
        <i class="far fa-square"
           v-if="!status.done"
        ></i>
      </span>
      {{ habit.name }}
    </h1>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { habitService } from '../services/HabitService'
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
      habitService.completeHabit(props.habit.id)
    }
    return { complete, status }
  }
}
</script>
<style scoped>
@import "../assets/css/habit.css";
</style>
