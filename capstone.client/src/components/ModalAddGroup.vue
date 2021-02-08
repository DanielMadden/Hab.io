<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <input type="text" v-model="form.name" />
      <input type="text" v-model="form.description" />
      <input type="text" v-model="form.imageUrl" />
      {{ form }}
    </div>
    <div class="myModal-footer">
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="createGroup"
      >
        Add Group
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
      name: '',
      description: '',
      imageUrl: '',
      private: false
    })
    const groupInfo = computed(() => AppState.activeGroupInfo)
    const createGroup = () => { groupService.createGroup(form) }
    return { groupInfo, createGroup, form }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
