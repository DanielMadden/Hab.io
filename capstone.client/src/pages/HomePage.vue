<template>
  <div
    id="home"
    class="container-fluid dark-scrollbar"
  >
    <div class="row px-3 pt-3 d-flex justify-content-between align-items-center">
      <h1 class="page-title px-3 pt-3">
        Explore
      </h1>
      <button id="add-group"
              class="mr-3 d-flex justify-content-center align-items-center"
              @click="addGroup"
      >
        <h1 class="p-0 m-0">
          +
        </h1>
      </button>
    </div>
    <div class="row px-3 pb-3">
      <div class="col-lg-4 col-sm-6 col-xs-12 px-3" v-for="group in groups" :key="group.id">
        <group-component :group="group"></group-component>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { groupService } from '../services/GroupService'
import { badgeService } from '../services/BadgeService'
import { AppState } from '../AppState'
import GroupComponent from '../components/GroupComponent.vue'
// import { socketService } from '../services/SocketService'
export default {
  components: { GroupComponent },
  name: 'Home',
  setup() {
    onMounted(() => {
      badgeService.getBadges()
      groupService.getPublicGroups()
      // socketService.emit('join:room', 'home')
    })
    const groups = computed(() => AppState.publicGroups)
    const addGroup = () => {
      AppState.darken = true
      AppState.showModal = true
      AppState.showAddGroupForm = true
    }
    return { groups, addGroup }
  }
}
</script>

<style scoped>
@import "../assets/css/global.css";
</style>
