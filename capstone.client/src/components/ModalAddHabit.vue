<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <input type="text" placeholder="name" v-model="form.name">
      <input type="text" placeholder="description" v-model="form.description">
      {{ form }}
    </div>
    <div class="myModal-footer">
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="create"
      >
        Create Habit
      </button>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { habitService } from '../services/HabitService'
import { closeModals } from '../utils/Modal'
export default {
  setup() {
    const form = reactive({
      name: '',
      description: '',
      groupId: computed(() => AppState.activeGroup.id),
      frequency: 1,
      difficulty: 1,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    })
    const create = () => { habitService.createHabit(form); closeModals() }
    return { form, create }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
