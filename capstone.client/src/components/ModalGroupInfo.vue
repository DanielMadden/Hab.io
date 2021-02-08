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
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="joinGroup"
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
export default {
  setup() {
    const groupInfo = computed(() => AppState.activeGroupInfo)
    const joinGroup = () => { groupMemberService.joinGroup(AppState.account.id, AppState.activeGroupInfo.id) }
    return { groupInfo, joinGroup }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
