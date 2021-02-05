<template lang="">
  <div id="navbar" class="container-fluid">
    <div id="navbar-vert-stretch" class="row">
      <div class="col-6 d-flex justify-content-start align-items-center">
        <h1>Logo</h1>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <h1 v-if="!user.isAuthenticated">
          Log In
        </h1>
        <button v-if="user.isAuthenticated">
          My Groups
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const account = computed(() => AppState.account)
    const user = computed(() => AppState.user)
    return {
      account, user
    }
  }
}
</script>
<style scoped>
@import '../assets/css/global.css';
</style>
