<template>
  <!-- <div>
    Modal
    <div class="modal fade"
         id="following"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Following
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ following }}
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      {{ following }}
    </div>
    <div class="myModal-footer">
    </div>
  </div>
</template>
<script>
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  setup() {
    return {
      following: computed(() => AppState.accountFollowing)
    }
  }
}
</script>
<style scoped>

</style>
