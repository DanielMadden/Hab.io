<template>
  <div id="myModal-container" :class="{'show': showModal, 'hide': !showModal}">
    <!-- Insert all modal components here with their respective v-if's -->
    <modal-group-info v-if="showGroupInfo"></modal-group-info>
    <modal-add-group v-if="showAddGroup"></modal-add-group>
  </div>
</template>
<script>
import { computed } from 'vue'
import ModalGroupInfo from './ModalGroupInfo.vue'
import { AppState } from '../AppState'
import ModalAddGroup from './ModalAddGroup.vue'
export default {
  components: { ModalGroupInfo, ModalAddGroup },
  setup() {
    const showModal = computed(() => AppState.showModal)
    const showGroupInfo = computed(() => AppState.showGroupInfo)
    const showAddGroup = computed(() => AppState.showAddGroupForm)
    return {
      showModal,
      showGroupInfo,
      showAddGroup
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
