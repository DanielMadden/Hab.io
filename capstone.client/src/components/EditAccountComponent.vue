<template>
  <!-- <div> -->
  <!-- <div class="modal fade"
         id="edit-modal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Edit Profile
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editProfile">
              <input type="text" placeholder="Name" v-model="state.account.name">
              <input type="text" placeholder="Profile Image" v-model="state.account.picture">
              <input type="text" placeholder="Background Image" v-model="state.account.backgroundImage">
              <button type="submit" class="btn btn-dark">
                Submit Changes
              </button>
            </form>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar d-flex justify-content-around flex-column">
      <form @submit.prevent="editProfile" class="my-2">
        <input class="my-1" type="text" placeholder="Name" v-model="state.account.name"><br>
        <input class="my-1" type="text" placeholder="Profile Image" v-model="state.account.picture"><br>
        <!-- <input class="my-1" type="text" placeholder="Custom Background Image" v-model="state.account.backgroundImage"><br> -->
        <input type="text" placeholder="Image search" @blur="getImages($event)" required="true" /> <br>
        <small class="text-muted">Select an available image</small>
        <div class="container">
          <div class="row" v-for="i in Math.ceil(potentialImages.length / 2)" :key="i">
            <div class="col justify-content-center py-1" v-for="img in potentialImages.slice((i - 1) * 2, i * 2)" :key="img.name">
              <img
                class="imageResizeAccount rounded-lg img-fluid"
                :src="img.imageURL"
                :alt="img.name"
                @click="highlightImage($event)"
              />
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-dark" id="submit">
          Submit Changes
        </button>
      </form>
    </div>
    <div class="myModal-footer">
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { groupService } from '../services/GroupService'
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.activeAccount)
    })
    const potentialImages = computed(() => AppState.accountImages)
    return {
      state,
      editProfile() {
        AppState.showBadges = false
        AppState.showModal = false
        AppState.darken = false
        AppState.accountImages = []
        state.account.backgroundImage = document.getElementsByClassName('highlightImageAccount')[0].currentSrc
        accountService.editProfile(state.account)
      },
      potentialImages,
      async getImages(e) {
        await groupService.getImagesForAccount(e.target.value)
        const elements = document.getElementsByClassName('imageResizeAccount')
        if (elements.length > 0) {
          elements[0].classList.add('highlightImageAccount')
          document.getElementById('submit').disabled = false
          document.getElementById('submit').classList.remove('disabledButton')
        }
      },
      highlightImage(e) {
        const imgs = e.target.parentNode.parentNode.parentNode.querySelectorAll('img')
        imgs.forEach(i => i.classList.remove('highlightImageAccount'))
        e.target.classList.add('highlightImageAccount')
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
.highlightImageAccount {
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 3px solid rgba(81, 203, 238, 1);
}
.disabledButton {
  background-color:#d2d2d2;
}
.imageResizeAccount{
  width: 100%;
  height: 200px;
  margin: auto;
  display: block;
}
</style>
