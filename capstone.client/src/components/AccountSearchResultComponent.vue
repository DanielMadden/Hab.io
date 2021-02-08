<template>
  <div class="account-compact d-flex">
    <div
      class="account-compact-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${accountProp.memberId.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="account-compact-text d-flex flex-column">
      <span>{{ accountProp.memberId.name }}</span>
      <span v-if="accountProp.status === 'Moderator'">Moderator</span>
      <span v-if="accountProp.status === 'Member'">Member</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    accountProp: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
@import "../assets/css/groupMember.css";
</style>
