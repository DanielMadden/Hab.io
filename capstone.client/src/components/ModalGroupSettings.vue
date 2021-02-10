<template>
  <div class="myModal-content">
    <div class="myModal-frame d-flex flex-column">
      <input type="text" v-model="form.name" />
      <input type="text" v-model="form.description" />
      <input type="text" v-model="form.imageUrl" />
    </div>
    <div class="myModal-footer">
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="updateGroup"
      >
        Update
      </button>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { groupService } from '../services/GroupService'
export default {
  setup() {
    const form = reactive({
      name: AppState.activeGroup.name,
      description: AppState.activeGroup.description,
      imageUrl: AppState.activeGroup.imageUrl
    })
    const group = computed(() => AppState.activeGroup)
    const updateGroup = () => {
      groupService.editGroup(form, AppState.activeGroup.id)
    }
    return {
      group,
      form,
      updateGroup
    }
  }
}
</script>
<style lang="">

</style>
