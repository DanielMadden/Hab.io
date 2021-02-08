<template lang="">
  <div class="group"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)), url('${group.imageUrl}') no-repeat center center /cover; overflow-y: hidden`"
       @click="showGroupInfo"
  >
    <div class="group-darken"></div>
    <div class="group-content">
      <h3 class="group-name">
        {{ group.name }}
      </h3>
      <p class="group-description m-0 p-0">
        {{ group.description }}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida neque convallis a cras. Aliquet lectus proin nibh nisl condimentum. Orci ac auctor augue mauris. Et netus et malesuada fames ac turpis. Neque egestas congue quisque egestas. Enim eu turpis egestas pretium aenean. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sed pulvinar proin gravida hendrerit lectus a. Quam viverra orci sagittis eu volutpat odio facilisis mauris sit. Elementum pulvinar etiam non quam lacus. Arcu cursus euismod quis viverra. Massa massa ultricies mi quis. Suspendisse potenti nullam ac tortor.
      </p>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { groupService } from '../services/GroupService'
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const showGroupInfo = () => {
      AppState.activeGroupInfo = props.group
      groupService.getGroup(props.group.id, false)
      AppState.darken = true
      AppState.showModal = true
      AppState.showGroupInfo = true
    }
    const travel = () => { router.push('/group/' + props.group.id) }

    return {
      showGroupInfo,
      travel
    }
  }
}
</script>
<style scoped>
@import "../assets/css/groups.css";
</style>
