<template>
  <header>
    <!-- <Navbar /> -->
    <nav-component></nav-component>
  </header>
  <main>
    <darken-component></darken-component>
    <my-groups-component></my-groups-component>
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
import MyGroupsComponent from './components/MyGroupsComponent.vue'
export default {
  components: { NavComponent, MyGroupsComponent },
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
