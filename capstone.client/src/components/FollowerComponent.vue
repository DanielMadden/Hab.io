<template>
  <div class="group-member d-flex">
    <div
      class="group-member-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${follow.followerId.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="group-member-text d-flex flex-column">
      <span class="group-member-name">
        {{ follow.followerId.name }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    follow: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
@import "../assets/css/groupMember.css";
</style>
