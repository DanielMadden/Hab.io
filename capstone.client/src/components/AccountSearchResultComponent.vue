<template>
  <!-- TODO Fix 'selected' class toggle, make selections distinguishable -->
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

.search-result {
  width: 100%;
  margin-bottom: 1em;
  background-color: white;
  padding: 1em;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 4px 4px 3px 2px rgba(0, 0, 0, 0.3);
  transition: all var(--transition-time) ease-in-out
}

.search-result:hover {
  box-shadow: 5px 5px 8px 3px rgba(0, 0, 0, 0.4);
  transform: translate3d(-5px, -5px, 0px);
}

.search-result-image {
  width: 3em;
  height: 3em;
  border-radius: 100%;
}

.search-result-text {
  margin-left: 1em;
}

.search-result-role {
  color: gray;
}
</style>
