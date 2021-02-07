<template lang="">
  <div class="myGroups-group"
       :style="`background: linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url('https://wallpaperaccess.com/full/30100.jpg') no-repeat center center /cover; overflow-y: hidden`"
  >
    <h3>{{ group.name }}</h3>
  </div>
</template>
<script>
export default {
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>
<style lang="">

</style>
