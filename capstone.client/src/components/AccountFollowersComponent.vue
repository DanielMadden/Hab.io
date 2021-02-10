<template>
  <!-- <div>
    Modal
  <div class="modal fade"
       id="followers"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Followers
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ followers }}
        </div>
      </div>
    </div>
  </div>
  </div> -->
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <FollowerComponent v-for="follow in followers" :key="follow.id" :follow="follow" />
    </div>
    <div class="myModal-footer">
    </div>
  </div>
</template>
<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  // props: {
  //   followers: {
  //     type: Array,
  //     required: true
  //   }
  // },
  setup() {
    return {
      followers: computed(() => AppState.accountFollowers)
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
