<template lang="">
  <div id="group-details"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
  >
    <!-- Hello group details:
    {{ group }}
    <div style="color:red">
      {{ groupMembers }}
    </div> -->
    <div id="group-habits"
         class="container-fluid dark-scrollbar"
    >
      <div class="row px-3 pt-3 d-flex justify-content-between align-items-center">
        <h1 id="group-name"
            class="page-title px-3 pt-3"
        >
          {{ group.name }}
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
    </div>
    <div id="group-sidebar">
      <div id="group-members"
           class="group-sidebars d-flex flex-column p-3"
           @mouseover="focus('members')"
           @mouseout="noFocus()"
      >
        <profile-compact-component v-for="groupMember in groupMembers" :key="groupMember.id" :group-member="groupMember"></profile-compact-component>
        {{ groupMembers }}
      </div>
      <div id="group-chat"
           class="group-sidebars"
           @mouseover="focus('chat')"
           @mouseout="noFocus()"
      >
      </div>
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
      const sidebarStyle = document.querySelector('#group-details').style
      section === 'members' ? sidebarStyle.setProperty('--members-height', '75%') : sidebarStyle.setProperty('--members-height', '25%')
    }
    const noFocus = () => {
      const sidebarStyle = document.querySelector('#group-details').style
      sidebarStyle.setProperty('--members-height', '50%')
    }
    return { group, groupMembers, focus, noFocus }
  }
}
</script>
<style>
@import "../assets/css/groupDetails.css";
</style>
