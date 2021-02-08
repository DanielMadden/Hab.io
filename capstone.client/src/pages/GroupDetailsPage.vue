<template lang="">
  <div id="group-details">
    <!-- Hello group details:
    {{ group }}
    <div style="color:red">
      {{ groupMembers }}
    </div> -->
    <div id="group-habits"
         :style="`background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
    >
    </div>
    <div id="group-sidebar">
      <div id="group-members"
           @mouseover="focus('members')"
           @mouseout="noFocus()"
      ></div>
      <div id="group-chat"
           @mouseover="focus('chat')"
           @mouseout="noFocus()"
      ></div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { groupService } from '../services/GroupService'
import { AppState } from '../AppState'
import { groupMemberService } from '../services/GroupMemberService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      groupService.getGroup(route.params.id, true)
      groupMemberService.getGroupMembers(route.params.id)
    })
    const group = computed(() => AppState.activeGroup)
    const groupMembers = computed(() => AppState.activeGroupMembers)
    const focus = (section) => {
      const css = document.querySelector('#group-details').style
      section === 'members' ? css.setProperty('--members-height', '75%') : css.setProperty('--members-height', '25%')
    }
    return { group, groupMembers, focus }
  }
}
</script>
<style>
@import "../assets/css/groupDetails.css";
</style>
