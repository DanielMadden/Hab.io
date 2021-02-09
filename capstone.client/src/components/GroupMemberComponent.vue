<template>
  <div class="row group-member">
    <div class="col  d-flex">
      <div
        class="group-member-image"
        :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${groupMember.memberId.picture}') no-repeat center center /cover; overflow-y: hidden`"
      ></div>
      <div class="group-member-text d-flex flex-column">
        <span>{{ groupMember.memberId.name }}</span>
        <span>{{ groupMember.status }}</span>
      </div>
    </div>
    <!-- TODO Display level instead of will -->
    <div class="col d-flex justify-content-end align-items-center">
      <span>Will - {{ groupMember.memberId.will }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    groupMember: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
@import "../assets/css/groupMember.css";
</style>
