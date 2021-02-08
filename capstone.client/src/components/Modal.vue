<template>
  <div id="myModal-container" :class="{'show': showModal, 'hide': !showModal}">
    <!-- Insert all modal components here with their respective v-if's -->
    <modal-group-info v-if="showGroupInfo"></modal-group-info>
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
