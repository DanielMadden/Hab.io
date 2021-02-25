<template>
  <div class="search-result d-flex" :class="{'selected': state.isSelected}" id="account-search-result-component" @click="!state.isSelected ? selectInvitee() : deselectInvitee()">
    <div
      class="search-result-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${searchResult.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="search-result-text d-flex flex-column">
      <span class="search-result-name">
        {{ searchResult.name }}
      </span>
    </div>
  </div>
</template>
<script>
import { computed, reactive, watchEffect } from 'vue'
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
    watchEffect(() => {
      if (AppState.accountSelectedInvitees.find(invite => invite._id === props.searchResult._id)) {
        state.isSelected = true
      } else { state.isSelected = false }
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

.selected {
  /* border: 2px, skyblue;
  box-shadow: 2px; */
  color: aquamarine;
}
</style>
