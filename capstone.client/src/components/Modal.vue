<template>
  <div id="myModal-screen"
       class="d-flex justify-content-center py-5"
       :class="{'show': showModal, 'hide': !showModal}"
  >
    <div id="myModal-clickoff" @click="close"></div>
    <div id="myModal-container">
      <!-- Insert all modal components here with their respective v-if's -->
      <modal-group-info v-if="modalChoice.groupInfo"></modal-group-info>
      <modal-add-group v-if="modalChoice.addGroup"></modal-add-group>
      <modal-add-habit v-if="modalChoice.addHabit"></modal-add-habit>
      <modal-invite v-if="modalChoice.invite"></modal-invite>
      <account-following-component v-if="modalChoice.following"></account-following-component>
      <account-followers-component v-if="modalChoice.followers"></account-followers-component>
      <account-groups-component v-if="modalChoice.accountGroups"></account-groups-component>
      <badges-modal-component v-if="modalChoice.badges"></badges-modal-component>
      <edit-account-component v-if="modalChoice.editAccount"></edit-account-component>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import ModalGroupInfo from './ModalGroupInfo.vue'
import { AppState } from '../AppState'
import ModalAddGroup from './ModalAddGroup.vue'
import AccountFollowersComponent from './AccountFollowersComponent.vue'
import AccountGroupsComponent from './AccountGroupsComponent.vue'
import BadgesModalComponent from './BadgesModalComponent.vue'
import EditAccountComponent from './EditAccountComponent.vue'
export default {
  components: { ModalGroupInfo, ModalAddGroup, AccountFollowersComponent, AccountGroupsComponent, BadgesModalComponent, EditAccountComponent },
  setup() {
    const showModal = computed(() => AppState.showModal)
    const modalChoice = reactive({
      groupInfo: computed(() => AppState.showGroupInfo),
      addGroup: computed(() => AppState.showAddGroupForm),
      addHabit: computed(() => AppState.showAddHabitForm),
      invite: computed(() => AppState.showInviteModal),
      following: computed(() => AppState.showFollowing),
      followers: computed(() => AppState.showFollowers),
      accountGroups: computed(() => AppState.showAccountGroups),
      editAccount: computed(() => AppState.showEditAccount),
      badges: computed(() => AppState.showBadges)
    })
    const close = () => {
      AppState.darken = false
      AppState.showModal = false
      AppState.showMyGroups = false
      AppState.showAddGroupForm = false
      AppState.showAddHabitForm = false
      AppState.showInviteModal = false
    }
    return {
      showModal,
      modalChoice,
      close
    }
  }
}
</script>
<style scoped>
@import "../assets/css/modals.css";
</style>
