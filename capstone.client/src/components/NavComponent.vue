<template lang="">
  <div id="nav-bar" class="d-flex justify-content-between">
    <!-- <div id="nav-vert-stretch" class="d-flex justify-content-between"> -->
    <div class="d-flex justify-content-start align-items-center">
      <h1 @click="travelHome" class="logo hoverable m-0">
        hab.io
      </h1>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <button v-if="!user.isAuthenticated" @click="login" class="nav-item nav-button">
        <h4 class="px-3 py-0 m-0">
          Log In
        </h4>
      </button>
      <button v-if="user.isAuthenticated" @click="logout" class="nav-item nav-button" id="nav-button-log-out">
        <h4 class="px-3 py-0 m-0">
          Log Out
        </h4>
      </button>
      <button v-if="user.isAuthenticated" @click="showMyGroups" class="nav-item nav-button" id="nav-button-my-groups">
        <h4 class="px-2 px-md-3 py-0 m-0">
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
// import { groupService } from '../services/GroupService'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { accountService } from '../services/AccountService'
import { badgeService } from '../services/BadgeService'

export default {
  setup() {
    function checkBadges() {
      for (let i = 0; i < AppState.activeAccount.badges.length; i++) {
        if (document.getElementById(AppState.activeAccount.badges[i].name)) {
          document.getElementById(AppState.activeAccount.badges[i].name).classList.remove('gray')
        }
        if (document.getElementById(AppState.activeAccount.badges[i].description)) {
          document.getElementById(AppState.activeAccount.badges[i].description).classList.remove('gray')
        }
      }
    }
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
              timer: 5000,
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
            AppState.checkAchievement = false
          }
        }
      }
    )
    const router = useRouter()
    const account = computed(() => AppState.account)
    const user = computed(() => AppState.user)
    const login = () => { AuthService.loginWithPopup() }
    const logout = async() => { await AuthService.logout({ returnTo: window.location.origin }) }
    const getMyGroups = () => {
      // groupService.getAccountGroups(AppState.account.id, true)
      accountService.getGroupMembersByAccountId(AppState.account.id)
    }
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
        accountService.getSelected(account.value.email)
        accountService.getGroups(account.value.email)
        accountService.getFollowers(account.value.email)
        accountService.getFollowing(account.value.email)
        accountService.getHabits(account.value.email)
        accountService.getWill(account.value.email)
        badgeService.getBadges()
        const waitForBadges = setInterval(() => {
          if (AppState.badges.length > 0) {
            checkBadges()
            clearInterval(waitForBadges)
          }
        }, 10)
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
#nav-bar {
  background-image: url(https://cutewallpaper.org/21/black-texture-wallpaper/Black-Scratched-Paint-Texture-Wallpaper-42274-Baltana.jpg);
  background-size: cover;
}
</style>
