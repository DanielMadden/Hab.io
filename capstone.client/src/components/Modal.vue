<template>
  <div id="myModal-container" :class="{'show': showModal, 'hide': !showModal}">
    <!-- <div id="modal-frame"> -->
    <modal-group-info v-if="showGroupInfo"></modal-group-info>
    <!-- </div> -->
    <!-- <div id="modal-footer">
    </div> -->
  </div>
</template>
<script>
import { computed } from 'vue'
import ModalGroupInfo from './ModalGroupInfo.vue'
import { AppState } from '../AppState'
export default {
  components: { ModalGroupInfo },
  setup() {
    const showModal = computed(() => AppState.showModal)
    const showGroupInfo = computed(() => AppState.showGroupInfo)
    return {
      showModal,
      showGroupInfo
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
