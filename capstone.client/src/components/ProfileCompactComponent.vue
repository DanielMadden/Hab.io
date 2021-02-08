<template>
  <div class="profile-compact d-flex">
    <div :src="`${groupMember.memberId.picture}`"
         class="profile-compact-image"
    ></div>
    <div class="profile-compact-text d-flex flex-column">
      <span>{{ groupMember.memberId.name }}</span>
      <span v-if="groupMember.status === 'Moderator'">MOD</span>
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
@import "../assets/css/profile.css";
</style>
