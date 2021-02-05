<template>
  <header>
    <!-- <Navbar /> -->
    <nav-component></nav-component>
  </header>
  <main>
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
export default {
  components: { NavComponent },
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
// @import "./assets/scss/main.scss";
@import "./assets/css/global.css";
</style>
