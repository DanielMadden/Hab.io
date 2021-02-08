<template lang="">
  <div id="group-details">
    Hello group details:
    {{ group }}
    <div style="color:red">
      {{ groupMembers }}
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { groupService } from '../services/GroupService'
import { AppState } from '../AppState'
import { groupMemberService } from '../services/GroupMemberService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      groupService.getGroup(route.params.id, true)
      groupMemberService.getGroupMembers(route.params.id)
    })
    const group = computed(() => AppState.activeGroup)
    const groupMembers = computed(() => AppState.activeGroupMembers)
    return { group, groupMembers }
  }
}
</script>
<style lang="">

</style>
