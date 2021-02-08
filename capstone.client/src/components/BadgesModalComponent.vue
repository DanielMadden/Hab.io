<template>
  <div>
    <!-- Modal -->
    <div class="modal fade"
         id="modelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Badges
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-around">
            <div v-for="badge in badges" :key="badge.name">
              <img :src="badge.imageUrl">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { logger } from '../utils/Logger'
import { badgeService } from '../services/BadgeService'
import { AppState } from '../AppState'
// import { computed } from 'vue'
export default {
  setup() {
    onMounted(async() => {
      try {
        await badgeService.getBadges()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      badges: computed(() => AppState.badges)
    }
  }
}
</script>
