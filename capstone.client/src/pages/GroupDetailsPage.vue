<template>
  <div id="group-main" class="container-fluid">
    <div class="row">
      <div class="col-8 bg-dark">
      </div>
      <div class="col-4">
        <ul>
          <li v-for="member in members" :key="member.id">
            {{ member.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
@import '../assets/css/global.css';
.row {
  height: 100%;
}
</style>
