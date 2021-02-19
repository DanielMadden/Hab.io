<template>
  <!-- <div>
    Modal
    <div class="modal fade"
         id="groups"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Groups
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ groups }}
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <my-group-component v-for="group in groups" :key="group.id" :group="group" />
    </div>
    <div class="myModal-footer">
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      groups: computed(() => AppState.accountGroups.filter(group => group.private !== true))
    }
  }
}
</script>
<style scoped>

</style>
