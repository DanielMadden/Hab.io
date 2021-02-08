<template>
  <div>
    <!-- Button trigger modal
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
      Launch
    </button> -->

    <!-- Modal -->
    <div class="modal fade"
         id="edit-modal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Edit Profile
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editProfile">
              <input type="text" placeholder="Name" v-model="state.account.name">
              <input type="text" placeholder="Profile Image" v-model="state.account.picture">
              <input type="text" placeholder="Background Image" v-model="state.account.backgroundImage">
              <button type="submit" class="btn btn-dark">
                Submit Changes
              </button>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.activeAccount[0])
    })
    return {
      state,
      editProfile() {
        accountService.editProfile(state.account)
      }
    }
  }
}
</script>
<style scoped>

</style>
