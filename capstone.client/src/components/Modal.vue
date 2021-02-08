<template>
  <div id="myModal-screen"
       class="d-flex justify-content-center py-5"
  >
    <div id="myModal-container" :class="{'show': showModal, 'hide': !showModal}">
      <!-- Insert all modal components here with their respective v-if's -->
      <modal-group-info v-if="modalChoice.groupInfo"></modal-group-info>
      <modal-add-group v-if="modalChoice.addGroup"></modal-add-group>
      <modal-add-habit v-if="modalChoice.addHabit"></modal-add-habit>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta possimus nemo voluptatibus officiis laudantium eligendi neque, qui illum at quam laborum. Eveniet debitis quibusdam tempore nostrum consequatur, odit quis autem? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem adipisci itaque earum quisquam ullam quaerat animi dignissimos odio! Est doloremque velit iusto optio mollitia ab dignissimos eos sed, molestias quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur necessitatibus adipisci aliquam architecto ex blanditiis ullam! Eum voluptatum recusandae adipisci nisi corporis minima. Quae libero soluta assumenda commodi delectus? Repudiandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut culpa enim nobis iure deleniti explicabo cumque consectetur corporis repellat pariatur atque mollitia nisi, ratione quis rerum impedit doloribus recusandae voluptatibus.
    </div>
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
