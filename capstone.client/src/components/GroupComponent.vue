<template lang="">
  <div class="group"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
       @click="showGroupInfo"
  >
    <h3>{{ group.name }}</h3>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { groupService } from '../services/GroupService'
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const showGroupInfo = () => {
      AppState.activeGroupInfo = props.group
      groupService.getGroup(props.group.id, false)
      AppState.darken = true
      AppState.showModal = true
      AppState.showGroupInfo = true
    }
    const travel = () => { router.push('/group/' + props.group.id) }

    return {
      showGroupInfo,
      travel
    }
  }
}
</script>
<style scoped>
@import "../assets/css/groups.css";
</style>
