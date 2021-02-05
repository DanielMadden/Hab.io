<template lang="">
  <div id="darken" :class="{'show': darken, 'hide': !darken}" @click="lighten"></div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const darken = computed(() => AppState.darken)
    const lighten = () => { AppState.darken = false; AppState.showMyGroups = false }
    return { darken, lighten }
  }
}
</script>
<style lang="">

</style>
