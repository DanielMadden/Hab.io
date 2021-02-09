<template lang="">
  <div id="group-details">
    <!-- Hello group details:
    {{ group }}
    <div style="color:red">
      {{ groupMembers }}
    </div> -->
    <div id="group-habits"
         class="container-fluid dark-scrollbar"
         :style="`background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
    >
      <div class="row px-3 pt-3 d-flex justify-content-between align-items-center">
        <h1 id="group-name"
            class="page-title px-3 pt-3"
        >
          {{ group.name }}
        </h1>
        <button id="add-habit"
                class="mr-3 d-flex justify-content-center align-items-center"
                @click="addHabit"
        >
          <h1 class="p-0 m-0">
            +
          </h1>
        </button>
      </div>
      <div class="row px-3 pb-3">
        <div class="col-4 px-3" v-for="habit in habits" :key="habit.id">
          <habit-component :habit="habit"></habit-component>
        </div>
      </div>
    </div>
    <div id="group-sidebar">
      <div id="group-members"
           class="group-sidebars d-flex flex-column p-3"
           @mouseover="focus('members')"
           @mouseout="noFocus()"
      >
        <group-member-component v-for="groupMember in groupMembers" :key="groupMember.id" :group-member="groupMember"></group-member-component>
        <button type="button" class="btn btn-dark" @click="inviteModal">
          Invite
        </button>
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
import { habitService } from '../services/HabitService'
export default {
  setup() {
    const route = useRoute()
    const group = computed(() => AppState.activeGroup)
    const groupMembers = computed(() => AppState.activeGroupMembers)
    const habits = computed(() => AppState.activeGroupHabits)
    const focus = (section) => {
      const sidebarStyle = document.querySelector('#group-details').style
      section === 'members' ? sidebarStyle.setProperty('--members-height', '75%') : sidebarStyle.setProperty('--members-height', '25%')
    }
    const noFocus = () => {
      const sidebarStyle = document.querySelector('#group-details').style
      sidebarStyle.setProperty('--members-height', '50%')
    }
    const inviteModal = () => {
      AppState.darken = true
      AppState.showModal = true
      AppState.showInviteModal = true
    }
    const addHabit = () => {
      AppState.darken = true
      AppState.showModal = true
      AppState.showAddHabitForm = true
    }
    onMounted(() => {
      groupService.getGroup(route.params.id, true)
      groupMemberService.getGroupMembers(route.params.id)
      habitService.getGroupHabits(route.params.id)
    })
    return { group, groupMembers, focus, noFocus, addHabit, habits, inviteModal }
  }
}
</script>
<style>
@import "../assets/css/groupDetails.css";
</style>
