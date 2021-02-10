<template>
  <div class="group-member d-flex" @click="travel()">
    <div
      class="group-member-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${follow.followeeId.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="group-member-text d-flex flex-column">
      <span class="group-member-name">
        {{ follow.followeeId.name }}
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
        router.push({ path: '/account/' + props.follow.followeeId.email })
        accountService.getSelected(props.follow.followeeId.email)
        accountService.getGroups(props.follow.followeeId.email)
        accountService.getFollowers(props.follow.followeeId.email)
        accountService.getFollowing(props.follow.followeeId.email)
        accountService.getHabits(props.follow.followeeId.email)
        accountService.getWill(props.follow.followeeId.email)
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
@import "../assets/css/groupMember.css";
</style>
