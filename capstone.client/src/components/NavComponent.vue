<template lang="">
  <div id="nav-bar" class="d-flex justify-content-between">
    <!-- <div id="nav-vert-stretch" class="d-flex justify-content-between"> -->
    <div class="d-flex justify-content-start align-items-center">
      <h1 @click="travelHome">
        Logo
      </h1>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <button v-if="!user.isAuthenticated" @click="login">
        Log In
      </button>
      <button v-if="user.isAuthenticated" @click="logout">
        Log Out
      </button>
      <button v-if="user.isAuthenticated" @click="showMyGroups" class="nav-item nav-button">
        <h4 class="px-3 py-0 m-0">
          My Groups
        </h4>
      </button>
      <img v-if="user.isAuthenticated"
           @click="travel"
           :src="user.picture"
           id="nav-profile-image"
           class="nav-item"
      />
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRouter } from 'vue-router'
import { groupService } from '../services/GroupService'
export default {
  setup() {
    const router = useRouter()
    const account = computed(() => AppState.account)
    const user = computed(() => AppState.user)
    const login = () => { AuthService.loginWithPopup() }
    const logout = async() => { await AuthService.logout({ returnTo: window.location.origin }) }
    const getMyGroups = () => { groupService.getAccountGroups(AppState.account.id, true) }
    const showMyGroups = () => { AppState.showMyGroups = true; AppState.darken = true; getMyGroups() }
    const travelHome = () => { router.push('/') }
    return {
      account,
      user,
      login,
      logout,
      showMyGroups,
      travelHome,
      travel() {
        router.push({ path: '/account/' + account.value.name })
      }
    }
  }
}
</script>
<style scoped>
@import '../assets/css/global.css';
</style>
