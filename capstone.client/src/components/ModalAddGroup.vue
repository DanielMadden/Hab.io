<template>
  <div class="myModal-content">
    <form id="formatForm" @submit.prevent="createGroup">
      <div class="myModal-frame dark-scrollbar">
        <div class="row d-flex">
          <div class="col-12 text-center">
            <h1> Create New Group</h1>
          </div>
          <div class="col-6 my-1">
            <input placeholder="Group name"
                   type="text"
                   required="true"
                   v-model="form.name"
            /> <br>
          </div>
          <div class="col-6 my-1">
            <input type="text" placeholder="Group description" v-model="form.description" required="true" />
          </div>
          <div class="col-6 my-1">
            <input type="text" placeholder="Image search" @blur="getImages($event)" required="true" /> <br>
            <small class="text-muted">Select an available image</small>
          </div>
          <div class="col-6 my-1">
            <input type="checkbox" id="private-checkbox" v-model="form.private" />
            <label class="form-check-label" for="private-checkbox">Private</label>
          </div>
        </div>
        <div id="potentialImgs" class="container">
          <div class="row" v-for="i in Math.ceil(potentialImages.length / 2)" :key="i">
            <div class="col justify-content-center py-1" v-for="img in potentialImages.slice((i - 1) * 2, i * 2)" :key="img.name">
              <img
                class="imageResize rounded-lg img-fluid"
                :src="img.imageURL"
                :alt="img.name"
                @click="highlightImage($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="myModal-footer">
        <button
          id="myModal-button-join-group"
          class="myModal-button disabledButton"
          disabled="true"
          type="submit"
        >
          Add Group
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { groupService } from '../services/GroupService'
import router from '../router'
import { logger } from '../utils/Logger'
export default {
  setup() {
    const state = reactive({
      activeGroup: computed(() => AppState.activeGroup)
    })
    const form = reactive({
      name: '',
      description: '',
      imageUrl: '',
      private: false
    })
    const potentialImages = computed(() => AppState.groupImages)
    const groupInfo = computed(() => AppState.activeGroupInfo)
    const createGroup = async() => {
      try {
        form.imageUrl = document.getElementsByClassName('highlightImage')[0].currentSrc
        await groupService.createGroup(form)
        AppState.darken = false
        AppState.showModal = false
        AppState.showAddGroupForm = false
        AppState.groupImages = []
        logger.log('right before route push' + state.activeGroup.id)
        router.push({ name: 'Group', params: { id: state.activeGroup.id } })
      } catch (error) {
        logger.error(error)
      }
    }
    return {
      state,
      groupInfo,
      createGroup,
      form,
      potentialImages,
      async getImages(e) {
        await groupService.getImagesForGroup(e.target.value)
        const elements = document.getElementsByClassName('imageResize')
        if (elements.length > 0) {
          elements[0].classList.add('highlightImage')
          document.getElementById('myModal-button-join-group').disabled = false
          document.getElementById('myModal-button-join-group').classList.remove('disabledButton')
        }
      },
      highlightImage(e) {
        const imgs = e.target.parentNode.parentNode.parentNode.querySelectorAll('img')
        imgs.forEach(i => i.classList.remove('highlightImage'))
        e.target.classList.add('highlightImage')
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
.highlightImage {
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 3px solid rgba(81, 203, 238, 1);
}

.imageResize{
  width: 100%;
  height: 200px;
  margin: auto;
  display: block;
}

.disabledButton {
  background-color:#d2d2d2;
}
</style>
