<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <div class="row d-flex">
        <div class="col-12 text-center">
          <h1>Search for users</h1>
        </div>
        <div class="col py-3 d-flex justify-content-center border-bottom">
          <input type="text"
                 placeholder="Search by name or email"
                 name="invitees"
                 id="invitees"
                 v-model="state.query"
          >
        </div>
        <div class="col-12 py-3">
          <div class="search-results">
            <AccountSearchResultComponent v-for="searchResult in state.searchResults" :key="searchResult.id" :search-result="searchResult">
            </AccountSearchResultComponent>
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
      selectedInvitees: computed(() => AppState.accountSelectedInvitees),
      activeGroup: computed(() => AppState.activeGroup),
      activeGroupMembers: computed(() => AppState.activeGroupMembers),
      accountSelectedInvitees: computed(() => AppState.accountSelectedInvitees),
      searchResults: computed(() => AppState.accountSearchResults.filter(account => !(state.activeGroupMembers.some(groupMember => groupMember.memberId.id === account._id))))

    })
    watchEffect(() => { if (state.query !== '') { accountService.getAccountsByQuery(state.query) } })
    async function sendInvites() {
      state.selectedInvitees.forEach(invitee => {
        sendInvite(invitee._id, state.activeGroup.id)
      })
    }
    async function sendInvite(inviteeId, groupId) {
      try {
        await groupMemberService.sendGroupInvite(inviteeId, groupId)
      } catch (error) {
        logger.error(error)
      }
    }
    return {
      state,
      sendInvites,
      sendInvite
      // async getAccounts() {
      //   try {
      //     await accountService.getAccountsByQuery(state.query)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // },

    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
