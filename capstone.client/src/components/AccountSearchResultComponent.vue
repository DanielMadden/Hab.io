<template>
  <!-- TODO Fix 'selected' class toggle, make selections distinguishable -->
  <div class="search-profile hoverable d-flex" :class="{'selected': state.isSelected}" id="account-search-result-component" @click="!state.isSelected ? selectInvitee() : deselectInvitee()">
    <div
      class="search-profile-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${searchResult.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="searc-profile-text d-flex flex-column">
      <span>{{ searchResult.name }}</span>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  props: {
    searchResult: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      accountSelectedInvitees: computed(() => AppState.accountSelectedInvitees),
      isSelected: false

    })
    return {
      state,
      selectInvitee() {
        AppState.accountSelectedInvitees.push(props.searchResult)
        state.isSelected = true
      },
      deselectInvitee() {
        AppState.accountSelectedInvitees = AppState.accountSelectedInvitees.filter(account => !(account._id === props.searchResult._id))
        state.isSelected = false
        document.getElementById('account-search-result-component')
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/searchProfile.css";

.selected{
  /* border: 2px, skyblue;
  box-shadow: 2px; */
  color: aquamarine;
}
.hoverable{
  cursor: pointer;
}
</style>
