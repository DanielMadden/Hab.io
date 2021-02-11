<template>
  <div class="group-member d-flex" @click="travel()">
    <div
      class="group-member-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${follow.followerId.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="group-member-text d-flex flex-column">
      <span class="group-member-name">
        {{ follow.followerId.name }}
      </span>
    </div>
  </div>
</template>
<script>
// import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
import { accountService } from '../services/AccountService'
import { badgeService } from '../services/BadgeService'
import { AppState } from '../AppState'
import { closeModals } from '../utils/Modal'
// import { computed } from 'vue'
export default {
  props: {
    follow: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    function checkBadges() {
      for (let i = 0; i < AppState.activeAccount.badges.length; i++) {
        document.getElementById(AppState.activeAccount.badges[i].name).classList.remove('gray')
      }
    }
    // const account = computed(() => AppState.activeAccount)
    return {
      travel() {
        router.push({ path: '/account/' + props.follow.followerId.email })
        accountService.getSelected(props.follow.followerId.email)
        accountService.getGroups(props.follow.followerId.email)
        accountService.getFollowers(props.follow.followerId.email)
        accountService.getFollowing(props.follow.followerId.email)
        accountService.getHabits(props.follow.followerId.email)
        accountService.getWill(props.follow.followerId.email)
        badgeService.getBadges()
        closeModals()
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
@import "../assets/css/groupMember.css";
</style>
