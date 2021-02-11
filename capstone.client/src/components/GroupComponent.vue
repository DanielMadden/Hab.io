<template lang="">
  <div class="group"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
       @click="showGroupInfo"
  >
    <div class="group-darken"></div>
    <div class="group-content">
      <h3 class="group-name">
        {{ group.name }}
      </h3>
      <p class="group-description m-0 p-0">
        {{ group.description }}
      </p>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { groupMemberService } from '../services/GroupMemberService'
import { groupService } from '../services/GroupService'
import { closeModals } from '../utils/Modal'
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
      groupMemberService.getActiveGroupMember(props.group.id)
      AppState.darken = true
      AppState.showModal = true
      AppState.showGroupInfo = true
    }
    const travel = () => {
      router.push('/group/' + props.group.id)
      closeModals()
    }

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
