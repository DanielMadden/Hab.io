<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <input type="text"
             placeholder="Search by name or email"
             name="invitees"
             id="invitees"
             v-model="state.query"
      >
      <div class="search-results">
        <!-- {{ searchResults }} -->
        <!-- <div v-if="searchResults.length > 0"> -->
        <account-search-result-component v-for="searchResult in searchResults" :key="searchResult.id" :search-result="searchResult"></account-search-result-component>
      <!-- </div> -->
      </div>
    </div>
    <div class="myModal-footer">
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="sendInvites"
      >
        Invite Selected
      </button>
    </div>
  </div>
</template>
<script>
import { computed, reactive, watchEffect } from 'vue'
import { logger } from '../utils/Logger'
import { accountService } from '../services/AccountService'
import { groupMemberService } from '../services/GroupMemberService'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      query: '',
      selectedInvitees: [],
      activeGroup: computed(() => AppState.activeGroup)

    })
    watchEffect(() => accountService.getAccountsByQuery(state.query))
    const searchResults = computed(() => AppState.accountSearchResults)
    return {
      searchResults,
      state,
      // async getAccounts() {
      //   try {
      //     await accountService.getAccountsByQuery(state.query)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // },
      async sendInvites() {
        state.selectedInvitees.forEach(invitee => {
          this.sendInvite(invitee.id, state.activeGroup.id)
        })
      },
      async sendInvite(inviteeId, groupId) {
        try {
          await groupMemberService.sendGroupInvite(inviteeId, groupId)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
