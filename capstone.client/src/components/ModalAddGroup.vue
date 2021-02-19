<template>
  <div class="myModal-content">
    <form id="formatForm" @submit.prevent="createGroup">
      <div class="myModal-frame dark-scrollbar">
        <div class="row d-flex">
          <div class="col-12 text-center">
            <h1> Create New Group</h1>
          </div>
          <div class="col-6 my-1">
            <div class="form-group">
              <input type="text"
                     v-model="form.name"
                     class="form-control"
                     name="new-group-name-input"
                     id="new-group-name-input"
                     aria-describedby="helpId"
                     placeholder="Group name"
                     required="true"
              >
            </div>
          </div>
          <div class="col-6 my-1">
            <div class="form-group">
              <input type="text"
                     v-model="form.description"
                     class="form-control"
                     name="new-group-description-input"
                     id="new-group-description-input"
                     aria-describedby="helpId"
                     placeholder="Group description"
                     required="true"
              >
            </div>
          </div>
          <div class="col-6 my-1">
            <div class="form-group">
              <input type="text"
                     class="form-control"
                     name="new-group-image-input"
                     id="new-group-image-input"
                     aria-describedby="helpId"
                     placeholder="Image search"
                     @blur="getImages($event)"
              >
              <small v-if="potentialImages[0]" class="form-text text-muted">Select an available image below</small>
            </div>
          </div>
          <div class="col-6 my-1">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input v-model="form.private"
                       class="form-check-input"
                       type="checkbox"
                       name="private-checkbox"
                       id="private-checkbox"
                       value="checkedValue"
                > Private
              </label>
            </div>
          </div>
        </div>
        <div class="container">
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
          id="myModal-button-add-group"
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
import { closeModals } from '../utils/Modal'
export default {
  setup() {
    const state = reactive({
      activeGroup: computed(() => AppState.activeGroup),
      creating: false
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
      if (state.creating === false) {
        state.creating = true
        try {
          form.imageUrl = document.getElementsByClassName('highlightImage')[0].currentSrc
          await groupService.createGroup(form)
          closeModals()
          AppState.groupImages = []
          router.push({ name: 'Group', params: { id: state.activeGroup.id } })
          state.creating = false
        } catch (error) {
          logger.error(error)
        }
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
          document.getElementById('myModal-button-add-group').disabled = false
          document.getElementById('myModal-button-add-group').classList.remove('disabledButton')
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
