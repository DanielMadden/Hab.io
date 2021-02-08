<template>
  <div id="myModal-container" :class="{'show': showModal, 'hide': !showModal}">
    <!-- Insert all modal components here with their respective v-if's -->
    <modal-group-info v-if="modalChoice.groupInfo"></modal-group-info>
    <modal-add-group v-if="modalChoice.addGroup"></modal-add-group>
    <modal-add-habit v-if="modalChoice.addHabit"></modal-add-habit>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import ModalGroupInfo from './ModalGroupInfo.vue'
import { AppState } from '../AppState'
import ModalAddGroup from './ModalAddGroup.vue'
export default {
  components: { ModalGroupInfo, ModalAddGroup },
  setup() {
    const showModal = computed(() => AppState.showModal)
    const modalChoice = reactive({
      groupInfo: computed(() => AppState.showGroupInfo),
      addGroup: computed(() => AppState.showAddGroupForm),
      addHabit: computed(() => AppState.showAddHabitForm)
    })
    return {
      showModal,
      modalChoice
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
