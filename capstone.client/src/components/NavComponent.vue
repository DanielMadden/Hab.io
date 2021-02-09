<template lang="">
  <div id="nav-bar" class="d-flex justify-content-between">
    <!-- <div id="nav-vert-stretch" class="d-flex justify-content-between"> -->
    <div class="d-flex justify-content-start align-items-center">
      <h1 @click="travelHome" class="logo hoverable">
        hab.io
      </h1>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <button v-if="!user.isAuthenticated" @click="login" class="nav-item nav-button">
        <h4 class="px-3 py-0 m-0">
          Log In
        </h4>
      </button>
      <button v-if="user.isAuthenticated" @click="logout" class="nav-item nav-button">
        <h4 class="px-3 py-0 m-0">
          Log Out
        </h4>
      </button>
      <button v-if="user.isAuthenticated" @click="showMyGroups" class="nav-item nav-button">
        <h4 class="px-3 py-0 m-0">
          My Groups
        </h4>
      </button>
      <img v-if="user.isAuthenticated"
           @click="travel"
           :src="account.picture"
           id="nav-profile-image"
           class="nav-item hoverable"
      />
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import { computed, reactive, watch } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { useRouter } from 'vue-router'
import { groupService } from '../services/GroupService'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { accountService } from '../services/AccountService'

export default {
  setup() {
    const state = reactive({
      checkAchievement: computed(() => AppState.checkAchievement)
    })
    watch(() => state.checkAchievement,
      (val, prevVal) => {
        if (val === true) {
          if (!AppState.account.badges.some(e => e.name === AppState.achievementName)) {
            AppState.account.badges.push(AppState.badges.find(b => b.name === AppState.achievementName))
            accountService.editBadges(AppState.account.id, AppState.account.badges)
            AppState.checkAchievement = false

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: AppState.achievementName
            })
          } else {
            console.log('already have badge')
          }
        }
      }
    )
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
        router.push({ path: '/account/' + account.value.email })
      }
    }
  }
}
</script>
<style scoped>
@import '../assets/css/global.css';

@font-face {
  font-family: "Pacifico";
  src: local("Pacifico"),
   url(../assets/font/Pacifico-Regular.ttf) format("truetype");
}

.hoverable{
  cursor: pointer;
}

.logo{
  font-family: "Pacifico";
}
</style>
