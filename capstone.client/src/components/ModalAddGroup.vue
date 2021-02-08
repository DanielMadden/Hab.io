<template>
  <div class="myModal-content">
    <div class="myModal-frame dark-scrollbar">
      <input type="text" v-model="form.name" @blur="getImages($event)" />
      <input type="text" v-model="form.description" />
      <input type="text" v-model="form.imageUrl" />
      {{ form }}
      <img v-for="img in potentialImages" :key="img.name" :src="img.imageURL" :alt="img.name" />
    </div>
    <div class="myModal-footer">
      <button id="myModal-button-join-group"
              class="myModal-button"
              @click="createGroup"
      >
        Add Group
      </button>
    </div>
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
    const createGroup = () => { groupService.createGroup(form) }
    return {
      groupInfo,
      createGroup,
      form,
      potentialImages,
      async getImages(e) {
        groupService.getImagesForGroup(e.target.value)
      }
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
