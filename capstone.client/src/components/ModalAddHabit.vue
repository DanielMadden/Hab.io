<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <div class="row">
        <div class="col-12 text-center">
          <h1> Create New Habit</h1>
        </div>
        <div class="col-6 my-1">
          <div class="form-group">
            <input v-model="form.name"
                   type="text"
                   class="form-control"
                   name="name"
                   id="name"
                   aria-describedby="helpId"
                   placeholder="Habit name"
            >
          </div>
        </div>
        <div class="col-6 my-1">
          <div class="form-group">
            <input v-model="form.description"
                   type="text"
                   class="form-control"
                   name="description"
                   id="description"
                   aria-describedby="helpId"
                   placeholder="Habit description"
            >
          </div>
        </div>
        {{ form }}
      </div>
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
