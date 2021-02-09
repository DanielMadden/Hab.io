<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <h1>{{ habit.name }}</h1>
      <p class="m-0 p-0">
        {{ habit.description }}
        {{ habit }}
      </p>
    </div>
    <div class="myModal-footer">
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="joinGroup"
      >
        Join Group
      </button>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const habit = computed(() => AppState.activeHabit)
    return { habit }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
