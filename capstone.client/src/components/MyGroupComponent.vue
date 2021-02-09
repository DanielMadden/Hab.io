<template lang="">
  <div class="myGroups-group"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
       @click="travel"
  >
    <h3 class="myGroups-name">
      {{ group.name }}
    </h3>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { groupService } from '../services/GroupService'
import { habitService } from '../services/HabitService'
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const travel = () => {
      router.push('/group/' + props.group.id)
      groupService.getGroup(props.group.id, true)
      habitService.getGroupHabits(props.group.id)
    }
    return { travel }
  }
}
</script>
<style lang="">

</style>
