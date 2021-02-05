<template lang="">
  <div id="nav-bar" class="container-fluid">
    <div id="nav-vert-stretch" class="row">
      <div class="col-6 d-flex justify-content-start align-items-center">
        <h1>Logo</h1>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <button v-if="!user.isAuthenticated" @click="login">
          Log In
        </button>
        <button v-if="user.isAuthenticated" @click="logout">
          Log Out
        </button>
        <button v-if="user.isAuthenticated" @click="showGroups">
          My Groups
        </button>
        <img v-if="user.isAuthenticated"
             @click="showGroups"
             :src="user.picture"
             id="nav-profile-image"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    const account = computed(() => AppState.account)
    const user = computed(() => AppState.user)
    const login = () => { AuthService.loginWithPopup() }
    const logout = async() => { await AuthService.logout({ returnTo: window.location.origin }) }
    return {
      account, user, login, logout
    }
  }
}
</script>
<style scoped>
@import '../assets/css/global.css';
</style>
