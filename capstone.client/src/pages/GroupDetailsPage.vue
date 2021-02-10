<template lang="">
  <div id="group-details"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
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
           v-if="authenticated"
      >
        <div id="group-chat-message-box"
             class="d-flex flex-column flex-reverse"
        >
          <div id="group-chat-messages">
            <message-component v-for="message in messages" :key="message.id" :message="message"></message-component>
          </div>
        </div>
        <form id="group-chat-bar"
              class="d-flex"
              @submit.prevent="sendMessage"
        >
          <input id="group-chat-input"
                 type="text"
                 placeholder="send a message..."
                 v-model="state.message"
          />
          <!-- @focusin="focusInput(true);focus('chat')"
                    @focusout="focusInput(false);noFocus()" -->
          <div id="group-chat-send"
               class="d-flex justify-content-center align-items-center"
               @click="sendMessage"
          >
            <h1 class="m-0 p-0">
              <i class="fas fa-paper-plane"></i>
            </h1>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { groupService } from '../services/GroupService'
import { AppState } from '../AppState'
import { groupMemberService } from '../services/GroupMemberService'
import { habitService } from '../services/HabitService'
import { messageService } from '../services/MessageService'
export default {
  setup() {
    const route = useRoute()
    const group = computed(() => AppState.activeGroup)
    const groupMembers = computed(() => AppState.activeGroupMembers)
    const habits = computed(() => AppState.activeGroupHabits)
    const messages = computed(() => AppState.activeGroupMessages)
    const authenticated = computed(() => AppState.user.isAuthenticated)
    const activeGroupMember = computed(() => AppState.activeGroupMember)
    const state = reactive({
      message: ''
    })
    const sendMessage = () => {
      if (state.message.length > 0) {
        messageService.sendMessage({ groupId: group.value.id, body: state.message })
        state.message = ''
      }
    }
    const focus = (section) => {
      const sidebarStyle = document.querySelector('#group-details').style
      section === 'members' ? sidebarStyle.setProperty('--members-height', '75%') : sidebarStyle.setProperty('--members-height', '25%')
    }
    const noFocus = () => {
      const sidebarStyle = document.querySelector('#group-details').style
      sidebarStyle.setProperty('--members-height', '50%')
    }
    const focusInput = (focused) => {
      const chatbarStyle = document.querySelector('#group-chat').style
      focused ? chatbarStyle.setProperty('--group-chat-height', '6em') : chatbarStyle.setProperty('--group-chat-height', '3em')
    }
    const scrollBottom = () => {
      const chatBox = document.getElementById('group-chat-message-box')
      chatBox.scrollTop = chatBox.scrollHeight
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
      const waitForLogin = setInterval(() => {
        if (AppState.user.isAuthenticated) {
          messageService.getGroupMessages(route.params.id)
          groupMemberService.getActiveGroupMember(route.params.id)
          clearInterval(waitForLogin)
        }
      }, 10)
    })
    return { group, groupMembers, focus, noFocus, addHabit, habits, inviteModal, state, focusInput, sendMessage, messages, scrollBottom, authenticated, activeGroupMember }
  }
}
</script>
<style>
@import "../assets/css/groupDetails.css";
</style>
