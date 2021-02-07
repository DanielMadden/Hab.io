<template>
  <div
    id="home"
    class="container-fluid"
  >
    <div class="row px-3 pt-3">
      <h1 class="px-3 pt-3">
        Explore
      </h1>
    </div>
    <div class="row px-3 pb-3">
      <div class="col-3 px-3" v-for="group in groups" :key="group.id">
        <group-component :group="group"></group-component>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { groupService } from '../services/GroupService'
import { AppState } from '../AppState'
import GroupComponent from '../components/GroupComponent.vue'
export default {
  components: { GroupComponent },
  name: 'Home',
  setup() {
    onMounted(() => { groupService.getPublicGroups() })
    const groups = computed(() => AppState.publicGroups)
    return { groups }
  }
}
</script>

<style scoped lang="scss">
// .home {
//   text-align: center;
//   user-select: none;
//   > img {
//     height: 200px;
//     width: 200px;
//   }
// }
</style>
