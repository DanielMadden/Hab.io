<template>
  <div class="search-profile d-flex">
    <div
      class="search-profile-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${searchResult.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="searc-profile-text d-flex flex-column">
      <span>{{ searchResult.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchResult: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
@import "../assets/css/searchProfile.css";
</style>
