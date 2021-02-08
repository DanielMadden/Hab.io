<template>
  <header>
    <!-- <Navbar /> -->
    <nav-component></nav-component>
  </header>
  <main>
    <darken-modal></darken-modal>
    <modal-my-groups></modal-my-groups>
    <modal></modal>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <!-- <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import NavComponent from './components/NavComponent.vue'
import ModalMyGroups from './components/ModalMyGroups.vue'
import ModalGroupInfo from './components/ModalGroupInfo.vue'
import Modal from './components/Modal.vue'
import DarkenModal from './components/DarkenModal.vue'
export default {
  components: { NavComponent, DarkenModal, ModalMyGroups, ModalGroupInfo, Modal },
  name: 'App',
  setup() {
    const appState = computed(() => AppState)
    return {
      appState
    }
  }
}
</script>
<style lang="scss">
// @import "./assets/scss/main.scss";
@import "./assets/css/global.css";
</style>
