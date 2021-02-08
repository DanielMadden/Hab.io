<template>
  <div class="about" id="home">
    <div class="container">
      <div class="row border-bottom" id="row-1">
        <div class="col-6">
          <img :src="account.picture" class="rounded-circle">
          <div class="d-flex" id="social-stats">
            <p class="px-1" data-toggle="modal" data-target="#following">
              <!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                Launch
              </button> -->
              Following <span class="font-weight-bold">100</span>
            </p>
            <AccountFollowingComponent />
            <p class="px-1" data-toggle="modal" data-target="#followers">
              Followers <span class="font-weight-bold">100</span>
            </p>
            <AccountFollowersComponent />
            <p class="px-1" data-toggle="modal" data-target="#groups">
              Groups <span class="font-weight-bold">100</span>
            </p>
            <AccountGroupsComponent />
          </div>
          <div id="main-info">
            <div class="card card-1">
              <div class="card-body">
                <p class="card-text mb-0">
                  Name
                </p>
                <h3 class="card-title" contenteditable="true" @blur="editName()">
                  {{ account.name }}
                </h3>
                <p class="card-text mb-0 pt-1">
                  email
                </p>
                <h3 class="card-title">
                  {{ account.email }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 d-flex justify-content-center">
          <div id="account-stats">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">
                  Will: {{ account.will }}
                </h3>
                <h3 class="card-title">
                  Level: {{ level }}
                </h3>
                <h3 class="card-title">
                  Title: in progress
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row border-bottom" id="badges-row">
        <h4 class="pt-3">
          Badges
        </h4>
        <div v-for="badge in account.badges" :key="badge.name">
          <img :src="badge.imageUrl">
        </div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modelId" id="see-badges">
          see all
        </button>
        <BadgesModalComponent />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    onMounted(() => {
      accountService.getAccount(route.params.name)
      // accountService.getGroups()
    })
    return {
      account: computed(() => AppState.account),
      level: computed(() => Math.floor(0.3 * Math.sqrt(AppState.account.will)))
    }
  }
}
</script>

<style scoped>
img {
  position: absolute;
  top: 3vh;
  left: 5vw;
  height: 20vh
}
#main-info {
  position: absolute;
  left: 25vw;
  top: 5vh
}
#row-1 {
  height: 30vh
}
#account-stats {
  position: absolute;
  top: 5vh
}
#social-stats {
  position: absolute;
  top: 25vh;
}
#badges-row {
  height: 25vh
}
#see-badges {
  position: absolute;
  right: 1vw;
}
@import '../assets/css/global.css';
</style>
