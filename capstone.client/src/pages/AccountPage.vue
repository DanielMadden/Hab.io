<template>
  <div class="about" id="home">
    <div class="container" v-if="account">
      <div class="row border-bottom" id="row-1">
        <div class="col-4 d-flex justify-content-center flex-column text-center align-items-center">
          <i class="fas fa-user-plus text-success" v-if="currentUser.email !== account.email" @click="followUser()"></i>
          <img :src="account.picture" class="rounded-circle profile-image">
          <div class="d-flex justify-content-center pt-2" id="social-stats">
            <p class="px-1" data-toggle="modal" data-target="#following" @click="toggleFollowing()">
              Following <span class="font-weight-bold">{{ following.length }}</span>
            </p>
            <p class="px-1" data-toggle="modal" data-target="#followers" @click="toggleFollowers()">
              Followers <span class="font-weight-bold">{{ followers.length }}</span>
            </p>
            <p class="px-1" data-toggle="modal" data-target="#groups" @click="toggleGroups()">
              Groups <span class="font-weight-bold">{{ groups.length }}</span>
            </p>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-center align-items-center">
          <div id="main-info">
            <div class="card card-1">
              <div class="card-body">
                <i class="fas fa-user-edit" v-if="account.id === currentUser.id" data-toggle="modal" data-target="#edit-modal" @click="toggleEdit()"></i>
                <small class="card-text mb-0">
                  <u>Name</u>
                </small>
                <h3 class="card-title" :contenteditable="account.id === currentUser.id" @blur="editName">
                  {{ account.name }}
                </h3>
                <small class="card-text mb-0 pt-1">
                  <u>Email</u>
                </small>
                <h3 class="card-title">
                  {{ account.email }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-center align-items-center">
          <div id="account-stats">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">
                  Will: {{ account.will }}
                </h3>
                <h3 class="card-title">
                  Level: {{ state.level }}
                </h3>
                <h3 class="card-title">
                  Title: in progress
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="badges-row">
        <div class="col-12 d-flex justify-content-between">
          <h4 class="pt-3">
            Badges
          </h4>
          <!-- <div v-for="badge in badges" :key="badge.name">
            <img
              :src="badge.imageUrl"
              :alt="badge.name"
            /> -->
          <!-- Button trigger modal -->
          <button type="button"
                  class="btn btn-secondary mt-3"
                  data-toggle="modal"
                  data-target="#modelId"
                  id="see-badges"
                  @click="toggleBadges"
          >
            see all
          </button>
        </div>
        <div v-for="badge in badges" :key="badge.name">
          <img
            :src="badge.imageUrl"
            :alt="badge.name"
          />
        </div>
      </div>
      <Modal />
    </div>
    <div class="row d-flex"
         id="tasks-row"
         :style="`background: url('${account.backgroundImage}');
  background-size: cover; `"
    >
      <div class="col-4" v-for="habit in habits" :key="habit.id">
        <HabitComponent :habit="habit" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    const state = reactive({
      level: computed(() => Math.floor(0.3 * Math.sqrt(AppState.activeAccount.will))),
      account: computed(() => AppState.user),
      follower: computed(() => AppState.account),
      followee: computed(() => AppState.activeAccount)
    })
    onMounted(() => {
      accountService.getSelected(route.params.email)
      accountService.getGroups(route.params.email)
      accountService.getFollowers(route.params.email)
      accountService.getFollowing(route.params.email)
      accountService.getHabits(route.params.email)
    })
    return {
      state,
      account: computed(() => AppState.activeAccount),
      currentUser: computed(() => AppState.account),
      // level: computed(() => Math.floor(0.3 * Math.sqrt(AppState.account.will))),
      followers: computed(() => AppState.accountFollowers),
      following: computed(() => AppState.accountFollowing),
      groups: computed(() => AppState.accountGroups),
      habits: computed(() => AppState.accountHabits),
      badges: computed(() => AppState.activeAccount.badges),
      editName(e) {
        accountService.edit(this.account.id, e.target.innerText)
      },
      toggleFollowers() {
        AppState.showFollowers = true
        AppState.showModal = true
        AppState.darken = true
      },
      toggleFollowing() {
        AppState.showFollowing = true
        AppState.showModal = true
        AppState.darken = true
      },
      toggleGroups() {
        AppState.showAccountGroups = true
        AppState.showModal = true
        AppState.darken = true
      },
      toggleBadges() {
        AppState.showBadges = true
        AppState.showModal = true
        AppState.darken = true
      },
      toggleEdit() {
        AppState.showEditAccount = true
        AppState.showModal = true
        AppState.darken = true
      },
      followUser() {
        const test = AppState.accountFollowers.find(f => f.followerId === AppState.account.id)
        if (!test) {
          accountService.followUser({ followerId: state.follower.id, followeeId: state.followee.id })
        }
      }
    }
  }
}
</script>

<style scoped>
.profile-image {
  height: 18vh;
  width: auto
}
#main-info {

}
#row-1 {
  height: 30vh
}
#account-stats {

}
#social-stats {

}
.fa-user-plus {
  position: absolute;
  top: 2vh;
  left: 2vw;
  font-size: 40px;
  z-index: 50;
}
#badges-row {
  height: 20vh
}
#see-badges {
  height: 4vh;
}
.fa-user-edit {
  position: absolute;
  top: 1vh;
  right: 1vw;
}
#tasks-row {
  position: absolute;
  margin: 0;
  top: 55vh;
  width: 100%;
  min-height: 40vh;

}
@import '../assets/css/global.css';
</style>
