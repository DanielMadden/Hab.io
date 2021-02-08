<template>
  <div class="myModal-content">
    <form id="formatForm" @submit.prevent="createGroup">
      <div class="myModal-frame dark-scrollbar">
        <input type="text" v-model="form.name" @blur="getImages($event)" required="true" />
        <input type="text" v-model="form.description" required="true" />
        <input type="checkbox" v-model="form.private" />
        <div class="container">
          <div class="row" v-for="i in Math.ceil(potentialImages.length / 2)" :key="i">
            <div class="col justify-content-center" v-for="img in potentialImages.slice((i - 1) * 2, i * 2)" :key="img.name">
              <img
                class="imageResize"
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
export default {
  setup() {
    const form = reactive({
      name: '',
      description: '',
      imageUrl: '',
      private: false
    })
    const potentialImages = computed(() => AppState.groupImages)
    const groupInfo = computed(() => AppState.activeGroupInfo)
    const createGroup = () => {
      form.imageUrl = document.getElementsByClassName('highlightImage')[0].currentSrc
      groupService.createGroup(form)
    }
    return {
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
  width: 90%;
  height: 266px;
  margin: auto;
  display: block;
}

.disabledButton {
  background-color:#d2d2d2;
}
</style>
