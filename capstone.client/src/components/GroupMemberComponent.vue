<template>
  <div class="group-member d-flex" @click="travelAccount">
    <div
      class="group-member-image"
      :style="`background: linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('${groupMember.memberId.picture}') no-repeat center center /cover; overflow-y: hidden`"
    ></div>
    <div class="group-member-text d-flex flex-column">
      <span class="group-member-name">
        {{ groupMember.memberId.name }}
      </span>
      <span class="group-member-role">
        <span v-if="groupMember.status === 'Moderator'">Moderator</span>
        <span v-if="groupMember.status === 'Member'">Member</span>
      </span>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    groupMember: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const travelAccount = () => { router.push('/account/' + props.groupMember.memberId.email) }
    return {
      travelAccount
    }
  }
}
</script>
<style scoped>
@import "../assets/css/groupMember.css";
</style>
