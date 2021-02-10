<template lang="">
  <div class="message-row d-flex flex-column"
       :class="{
         'align-items-end': account.id == message.creatorId,
         'align-items-start': account.id !== message.creatorId
       }"
  >
    <span class="message-name">{{ message.creator.name }}</span>
    <div class="message"
         :class="{
           'self':account.id == message.creatorId,
           'other':account.id !== message.creatorId
         }"
    >
      {{ message.body }}
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  setup() {
    const account = computed(() => AppState.account)
    return {
      account
    }
  }
}
</script>
<style scoped >
@import "../assets/css/message.css";
</style>
