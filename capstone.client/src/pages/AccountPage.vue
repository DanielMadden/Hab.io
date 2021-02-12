<template>
  <div class="about" id="home">
    <!-- desktop view -->
    <div class="container-fluid" v-if="account" id="desktop-view">
      <div class="row border-bottom" id="row-1">
        <div class="col-4 d-flex justify-content-center flex-column text-center align-items-center">
          <img :src="account.picture" class="rounded-circle profile-image">
          <div class="d-flex justify-content-center pt-2" id="social-stats">
            <p class="px-1 clickable" data-toggle="modal" data-target="#following" @click="toggleFollowing()">
              Following <span class="font-weight-bold">{{ following.length }}</span>
            </p>
            <p class="px-1 clickable" data-toggle="modal" data-target="#followers" @click="toggleFollowers()">
              Followers <span class="font-weight-bold">{{ followers.length }}</span>
            </p>
            <p class="px-1 clickable" data-toggle="modal" data-target="#groups" @click="toggleGroups()">
              Groups <span class="font-weight-bold">{{ groups.length }}</span>
            </p>
          </div>
          <div>
            <div v-if="state.followButton === true">
              <button class="btn btn-dark" v-if="currentUser.email !== account.email" @click="followUser()">
                <i class="fas fa-user-plus pr-1"></i>Follow User
              </button>
            </div>
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
                <h2 class="card-title">
                  Will: {{ will }}
                </h2>
                <h2 class="card-title">
                  Level: {{ Math.floor(0.3 * Math.sqrt(will)) }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" id="badges-row">
        <div class="col-12 d-flex justify-content-around mt-1">
          <div v-for="badge in allBadges" :key="badge.name">
            <img
              :src="badge.imageUrl"
              :alt="badge.name"
              :title="`${badge.name}: ${badge.description}`"
              class="gray"
              :id="badge.name"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex"
         id="tasks-row"
         :style="`background: url('${account.backgroundImage}');
  background-size: cover; `"
    >
      <div class="col-4-md col-12" v-for="habit in habits" :key="habit.id">
        <HabitComponent :habit="habit" />
      </div>
    </div>

    <!-- mobile view -->
    <div class="container-fluid d-none" v-if="account" id="mobile-view">
      <div class="row mt-3 pb-2">
        <div class="col-5 d-flex align-items-center justify-content-center flex-column">
          <i class="fas fa-user-plus text-success" v-if="currentUser.email !== account.email" @click="followUser()"></i>
          <img :src="account.picture" class="rounded-circle profile-image">
          <div class="card mt-2">
            <div class="card-body px-1 text-center">
              <!-- <p class="card-text">Text</p> -->
              <small class="px-1 clickable" @click="toggleFollowing()">
                Following <span class="font-weight-bold">{{ following.length }}</span>
              </small>
              <small class="px-1 clickable" @click="toggleFollowers()">
                Followers <span class="font-weight-bold">{{ followers.length }}</span>
              </small>
              <small class="px-1  mb-0 clickable" @click="toggleGroups()">
                Groups <span class="font-weight-bold">{{ groups.length }}</span>
              </small>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div class="card">
            <div class="card-body tect-center p-2">
              <h5 class="card-title">
                Will: {{ will }}
              </h5>
              <h5 class="card-title">
                Level: {{ Math.floor(0.3 * Math.sqrt(will)) }}
              </h5>
              <i class="fas fa-user-edit" v-if="account.id === currentUser.id" @click="toggleEdit()"></i>
              <small class="card-text mb-0">
                <u>Name</u>
              </small>
              <h6 class="card-title" :contenteditable="account.id === currentUser.id" @blur="editName">
                {{ account.name }}
              </h6>
              <small class="card-text mb-0 pt-1">
                <u>Email</u>
              </small>
              <p class="card-title">
                {{ account.email }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-around mt-1" v-for="badge in allBadges" :key="badge.name">
          <div>
            <img
              :src="badge.imageUrl"
              :alt="badge.name"
              :title="`${badge.name}: ${badge.description}`"
              class="gray sm-badges"
              :id="badge.description"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
import { badgeService } from '../services/BadgeService'
export default {
  name: 'Account',
  setup() {
    // const allBadges = computed(() => AppState.badges)
    function checkBadges() {
      for (let i = 0; i < AppState.activeAccount.badges.length; i++) {
        document.getElementById(AppState.activeAccount.badges[i].name).classList.remove('gray')
        document.getElementById(AppState.activeAccount.badges[i].description).classList.remove('gray')
      }
    }
    function checkFollow(email) {
      if (accountService.checkFollowing(email)) {
        console.log(accountService.checkFollowing(email))
        state.followButton = false
      } else {
        console.log(accountService.checkFollowing(email))
        state.followButton = true
      }
    }
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.user),
      follower: computed(() => AppState.account),
      followee: computed(() => AppState.activeAccount),
      followButton: true
    })
    onMounted(() => {
      accountService.getSelected(route.params.email)
      accountService.getFollowers(route.params.email)
      accountService.getGroups(route.params.email)
      accountService.getFollowing(route.params.email)
      accountService.getHabits(route.params.email)
      accountService.getWill(route.params.email)
      badgeService.getBadges()
      checkFollow(route.params.email)
      const waitForBadges = setInterval(() => {
        if (AppState.badges.length > 0) {
          checkBadges()
          clearInterval(waitForBadges)
        }
      }, 10)
    })
    return {
      checkBadges,
      state,
      will: computed(() => AppState.activeAccountWill),
      account: computed(() => AppState.activeAccount),
      currentUser: computed(() => AppState.account),
      followers: computed(() => AppState.accountFollowers),
      following: computed(() => AppState.accountFollowing),
      groups: computed(() => AppState.accountGroups),
      habits: computed(() => AppState.accountHabits),
      badges: computed(() => AppState.activeAccount.badges),
      allBadges: computed(() => AppState.badges),
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
      toggleEdit() {
        AppState.showEditAccount = true
        AppState.showModal = true
        AppState.darken = true
      },
      followUser() {
        if (!accountService.checkFollowing(route.params.email)) {
          state.followButton = false
          accountService.followUser({ followerId: state.follower.id, followeeId: state.followee.id })
        }
      }
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.profile-image {
  height: 18vh;
  width: auto
}
#row-1 {
  height: 30vh
}
.gray {
  filter: grayscale(100%)
}
/* .fa-user-plus {
  position: absolute;
  top: 2vh;
  left: 2vw;
  font-size: 40px;
  cursor: pointer;
} */
#badges-row {
  height: 20vh
}
.fa-user-edit {
  position: absolute;
  top: 1vh;
  right: 1vw;
}
#tasks-row {
  position: absolute;
  margin: 0;
  top: 42vh;
  width: 100%;
  min-height: 49.7vh;
}
@media only screen and (max-width: 769px) {
  #desktop-view {
    display: none;
  }
  #mobile-view {
    display: block !important
  }
  .profile-image {
    height: 100px;
    width: 100px
  }
  .sm-badges {
    height: 60px;
    width: 60px
  }
  #tasks-row {
  position: absolute;
  margin: 0;
  top: 58vh;
  width: 100%;
  min-height: 49.7vh;
}
.fa-user-plus {
  font-size: 20px
}
}
@import '../assets/css/global.css';
</style>
