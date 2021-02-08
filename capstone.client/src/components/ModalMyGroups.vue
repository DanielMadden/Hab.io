<template lang="">
  <div id="myGroups-container"
       class="fancy-scrollbar dark-scrollbar"
       :class="{'show': show, 'hide': !show}"
  >
    <h1 class="pb-1">
      My Groups
    </h1>
    <my-group-component v-for="group in myGroups" :key="group.id" :group="group"></my-group-component>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
// import { groupService } from '../services/GroupService'
export default {
  setup() {
    const myGroups = computed(() => AppState.myGroups)
    const show = computed(() => AppState.showMyGroups)
    // onMounted(() => {  })
    return {
      myGroups, show
    }
  }
}
</script>
<style scoped>
@import "../assets/css/myGroups.css";
</style>
