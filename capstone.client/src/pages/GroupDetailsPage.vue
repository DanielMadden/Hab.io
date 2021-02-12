<template lang="">
  <div id="group-details"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
  >
    <div id="tab-bar" class="container-fluid p-0">
      <div id="tab-bar-row" class="row">
        <div id="tab-bar-members"
             class="tab-bar-column col-4 d-flex justify-content-center align-items-center"
             :class="{'selected': state.tabSelect == 'members'}"
             @click="selectTab('members')"
        >
          <i class="fas fa-users"></i>
        </div>
        <div id="tab-bar-habits"
             class="tab-bar-column col-4 d-flex justify-content-center align-items-center"
             :class="{'selected': state.tabSelect == 'habits'}"
             @click="selectTab('habits')"
        >
          <i class="fas fa-check-double"></i>
        </div>
        <div id="tab-bar-chat"
             class="tab-bar-column col-4 d-flex justify-content-center align-items-center"
             :class="{'selected': state.tabSelect == 'chat'}"
             @click="selectTab('chat')"
        >
          <i class="fas fa-comments"></i>
        </div>
      </div>
    </div>
    <!-- Hello group details:
    {{ group }}
    <div style="color:red">
      {{ groupMembers }}
    </div> -->
    <div id="group-habits"
         class="container-fluid dark-scrollbar tab-section"
         :class="{'selected': state.tabSelect == 'habits'}"
    >
      <div class="row px-3 pt-3 d-flex justify-content-between align-items-center">
        <h1 id="group-name"
            class="page-title px-md-3 pt-3"
        >
          {{ group.name }}
        </h1>
        <div v-if="activeGroupMember.status === 'Moderator'"
             id="group-buttons"
             class="d-flex justify-content-between justify-content-md-end"
        >
          <button
            id="open-group-settings"
            class="group-button mr-3 d-flex justify-content-center align-items-center"
            @click="openGroupSettings"
          >
            <h3 class="group-button-text p-0 m-0">
              <i class="fas fa-cog"></i>
            </h3>
          </button>
          <button id="add-habit"
                  class="group-button mr-3 d-flex justify-content-center align-items-center"
                  @click="addHabit"
          >
            <h1 class="group-button-text p-0 m-0">
              +
            </h1>
          </button>
        </div>
      </div>
      <div id="habit-section" class="row px-0 px-md-3 pb-3">
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 px-3" v-for="habit in habits" :key="habit.id">
          <habit-component :habit="habit"></habit-component>
        </div>
      </div>
    </div>
    <div id="group-sidebar">
      <div id="group-members"
           class="group-sidebars d-flex flex-column p-3 tab-section"
           :class="{'selected': state.tabSelect == 'members'}"
           @mouseover="focus('members')"
           @mouseout="noFocus()"
      >
        <button id="group-member-list-button-accept"
                class="group-member-list-button"
                v-if="activeGroupMember.status === 'Pending'"
                @click="acceptGroup()"
        >
          Accept Invitation
        </button>
        <button id="group-member-list-button-decline"
                class="group-member-list-button"
                v-if="activeGroupMember.status === 'Pending'"
                @click="declineGroup()"
        >
          Decline Invitation
        </button>
        <button id="group-member-list-button-invite"
                class="group-member-list-button"
                v-if="((group.private === false) && (activeGroupMember.status === 'Member' || activeGroupMember.status === 'Moderator')) || (group.private === true && activeGroupMember.status === 'Moderator')"
                @click="inviteModal"
        >
          Invite
        </button>
        <group-member-component v-for="groupMember in groupMembers" :key="groupMember.id" :group-member="groupMember"></group-member-component>
      </div>
      <div id="group-chat"
           class="group-sidebars tab-section"
           :class="{'selected': state.tabSelect == 'chat'}"
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
                 autocomplete="off"
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
import { useRoute, useRouter } from 'vue-router'
import { groupService } from '../services/GroupService'
import { AppState } from '../AppState'
import { groupMemberService } from '../services/GroupMemberService'
import { habitService } from '../services/HabitService'
import { messageService } from '../services/MessageService'
import { socketService } from '../services/SocketService'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const group = computed(() => AppState.activeGroup)
    const groupMembers = computed(() => AppState.activeGroupMembers)
    const habits = computed(() => AppState.activeGroupHabits)
    const messages = computed(() => AppState.activeGroupMessages)
    const authenticated = computed(() => AppState.user.isAuthenticated)
    const activeGroupMember = computed(() => AppState.activeGroupMember)
    const state = reactive({
      message: '',
      tabSelect: 'habits'
    })
    const selectTab = (tab) => {
      state.tabSelect = tab
    }
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
      AppState.accountSearchResults = []
      AppState.accountSelectedInvitees = []
    }
    const addHabit = () => {
      AppState.darken = true
      AppState.showModal = true
      AppState.showAddHabitForm = true
    }
    const openGroupSettings = () => {
      AppState.darken = true
      AppState.showModal = true
      AppState.showGroupSettings = true
    }
    const acceptGroup = () => {
      groupMemberService.acceptGroupInvite(activeGroupMember.value.id)
    }
    const declineGroup = () => {
      groupMemberService.declineGroupInvite(activeGroupMember.value.id)
      router.push('/')
    }
    onMounted(() => {
      groupService.getGroup(route.params.id, true)
      groupMemberService.getGroupMembers(route.params.id)
      habitService.getGroupHabits(route.params.id)
      const waitForLogin = setInterval(() => {
        if (AppState.user.isAuthenticated) {
          messageService.getGroupMessages(route.params.id)
          groupMemberService.getActiveGroupMember(route.params.id)
          socketService.emit('join:room', route.params.id)
          clearInterval(waitForLogin)
        }
      }, 10)
    })
    return { group, groupMembers, focus, noFocus, addHabit, habits, inviteModal, state, focusInput, sendMessage, messages, scrollBottom, authenticated, activeGroupMember, openGroupSettings, selectTab, acceptGroup, declineGroup }
  }
}
</script>
<style>
@import "../assets/css/groupDetails.css";
</style>
