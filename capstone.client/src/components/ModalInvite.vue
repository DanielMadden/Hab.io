<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <input type="text"
             placeholder="Invite"
             name="invitees"
             id="invitees"
             v-model="state.query"
             @change="getAccounts"
      >
    </div>
    <div class="myModal-footer">
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="invite"
      >
        Join Group
      </button>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { accountService } from '../services/AccountService'
export default {
  setup() {
    const state = reactive({
      query: ''

    })
    return {

      state
      // async getAccounts(query) {
      //   try {
      //     await accountService.
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // },
      // async sendInvite() {
      //   try {

      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
