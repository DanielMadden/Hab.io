<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <div class="myModal-image"
           :src="groupInfo.imageUrl"
           :style="`background: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url('${groupInfo.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
      ></div>
      <h1>{{ groupInfo.name }}</h1>
      <p class="m-0 p-0">
        {{ groupInfo.description }}
      </p>
    </div>
    <div class="myModal-footer">
      <!-- v-if="!state.activeGroupInfoGroupMember" -->
      <div v-if="groupMember">
        <button v-if="groupMember.status === 'Moderator' || groupMember.status === 'Member'"
                class="myModal-button"
                @click="goToGroup()"
        >
          Go To Group
        </button>
        <div v-else-if="groupMember.status === 'Pending'">
          <button id="button-decline"
                  class="myModal-button mr-3"
                  @click="declineGroup()"
          >
            Decline
          </button>
          <button id="button-accept"
                  class="myModal-button"
                  @click="acceptGroup()"
          >
            Accept
          </button>
        </div>
      </div>
      <button v-else
              id="myModal-button-join-group"
              class="myModal-button"
              @click="joinGroup()"
      >
        Join Group
      </button>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { groupMemberService } from '../services/GroupMemberService'
import router from '../router'
import { logger } from '../utils/Logger'
import { closeModals } from '../utils/Modal'
export default {
  setup() {
    // const state = reactive({
    //   activeGroupInfoGroupMember: computed(() => AppState.activeGroupInfoGroupMember)
    // })
    // onBeforeMount(() => {
    //   AppState.activeGroupInfoGroupMember = AppState.myGroupMembers.find(groupMember => groupMember.groupId.id === groupInfo.value.id)
    // })
    // onBeforeUnmount(() => {
    //   AppState.activeGroupInfoGroupMember = null
    // })
    const groupInfo = computed(() => AppState.activeGroupInfo)
    const groupMember = computed(() => AppState.myGroupMembers.find(gM => gM.groupId.id === groupInfo.value.id))
    const joinGroup = async() => {
      try {
        const newGroupMemeber = await groupMemberService.joinGroup(AppState.account.id, AppState.activeGroupInfo.id)
        closeModals()
        router.push({ name: 'Group', params: { id: newGroupMemeber.groupId } })
      } catch (error) {
        logger.error(error)
      }
    }
    const goToGroup = () => {
      closeModals()
      router.push({ name: 'Group', params: { id: groupInfo.value.id } })
    }
    const acceptGroup = () => {
      closeModals()
      groupMemberService.acceptGroupInvite(groupMember.value.id)
      router.push({ name: 'Group', params: { id: groupInfo.value.id } })
    }
    const declineGroup = () => {
      closeModals()
      groupMemberService.declineGroupInvite(groupMember.value.id)
    }
    return { groupInfo, joinGroup, groupMember, goToGroup, acceptGroup, declineGroup }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";

#button-accept {
  background-color: rgb(153, 255, 0);
}

#button-decline {
  background-color: rgb(251, 92, 92)
}

</style>
